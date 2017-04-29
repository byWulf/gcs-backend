'use strict';

const childProcess = require('child_process');

const EventError = require('../error/eventError');
const MethodError = require('../error/methodError');
const MatchModel = require('../model/match');
const SlotModel = require('../model/match/slot');
const gameService = require('./game.service');
const userService = require('./user.service');
const gameCommunicator = require('../gameCommunicator');

module.exports = new (function() {
    let self = this;

    this.matches = {};
    this.nextMatchId = 1;

    this.subscriptions = [];

    this.gameSendFunction = function() {};

    this.frontendEmitter = null;

    this._loadUser = function(socketId) {
        let user = userService.findBySocketId(socketId);

        return user ? {id: user._id.toString(), displayName: user.displayName} : null;
    };

    this.createMatch = function(gameKey, settings, socketId) {
        let user = this._loadUser(socketId);
        if (user === null) throw new EventError('match.notLoggedIn');

        let game = gameService.findByKey(gameKey);

        let matchId = this.nextMatchId++;

        let match = this.matches[matchId] = new MatchModel();
        match.id = matchId;
        match.game = game;
        match.settings = settings;

        let slots = [];
        for (let i = 0; i < game.maxPlayers; i++) {
            let slot = new SlotModel();
            if (i === 0) {
                slot.user = user;
            }
            slot.color = game.slotColors[i];

            slots.push(slot);
        }
        match.slots = slots;
        match.masterUserId = user.id;

        try {
            let commandParts = game.getCommand().split(' ');
            match.setGameProcess(childProcess.spawn(commandParts[0], commandParts.slice(1).concat([matchId]), {cwd: game.getPath()}));
        } catch (e) {
            delete this.matches[match.id];
            throw new EventError('match.gameProcessFailed', e.getMessage());
        }
        match.getGameProcess().stdout.on('data', function(data) {
            console.log("Game process #" + match.id + " - Out: ", data.toString());
        });
        match.getGameProcess().stderr.on('data', function(data) {
            console.log("Game process #" + match.id + " - Err: ", data.toString());
        });
        match.getGameProcess().on('close', function(code) {
            console.log("Game process of match " + match.id + " closed with code " + code);

            if (match.state === 'open' || match.state === 'running') {
                match.setState('canceled');
                self.sendUpdateToSubscribers(match, 'state', match.state);
            }

            match.setGameProcess(null);
        });

        match.eventEmitter.on('slotsChanged', function() {
            self.sendUpdateToSubscribers(match, 'slots', match.slots);
        });
        match.eventEmitter.on('event', function(data) {
            self.sendUpdateToSubscribers(match, 'event', data);
        });

        return match;
    };

    this.joinMatch = function(matchId, socketId, index) {
        if (typeof this.matches[matchId] === 'undefined') throw new EventError('match.notExisting');

        let user = this._loadUser(socketId);
        if (user === null) throw new EventError('match.notLoggedIn');

        let match = this.matches[matchId];
        if (match.state !== 'open') throw new EventError('match.notOpen');

        for (let i = 0; i < match.slots.length; i++) {
            if (match.slots[i].user !== null && match.slots[i].user.id === user.id) {
                throw new EventError('match.alreadyJoined');
            }
        }

        if (typeof match.slots[index] === 'undefined' || match.slots[index].user !== null) {
            throw new EventError('match.slotNotOpen');
        }

        match.slots[index].user = user;

        this.sendUpdateToSubscribers(match, 'slots', match.slots);

        this.gameSendFunction(match.getGameSocket(), 'user.joined', {
            slotIndex: index,
            user: user
        });

        return match;
    };

    this.switchSlot = function(matchId, socketId, index) {
        if (typeof this.matches[matchId] === 'undefined') throw new EventError('match.notExisting');

        let user = this._loadUser(socketId);
        if (user === null) throw new EventError('match.notLoggedIn');

        let match = this.matches[matchId];
        if (match.state !== 'open') throw new EventError('match.notOpen');

        let oldIndex = null;
        for (let i = 0; i < match.slots.length; i++) {
            if (match.slots[i].user !== null && match.slots[i].user.id === user.id) {
                oldIndex = i;
            }
        }
        if (oldIndex === null) throw new EventError('match.notJoined');

        if (typeof match.slots[index] === 'undefined' || match.slots[index].user !== null) {
            throw new EventError('match.slotNotOpen');
        }

        match.slots[oldIndex].user = null;
        match.slots[index].user = user;

        this.sendUpdateToSubscribers(match, 'slots', match.slots);

        this.gameSendFunction(match.getGameSocket(), 'user.switched', {
            oldSlotIndex: oldIndex,
            newSlotIndex: index,
            user: user
        });

        return match;
    };

    this.leaveMatch = function(matchId, socketId) {
        if (typeof this.matches[matchId] === 'undefined') throw new EventError('match.notExisting')

        let user = this._loadUser(socketId);
        if (user === null) throw new EventError('match.notLoggedIn');

        let match = this.matches[matchId];
        if (match.state !== 'open') throw new EventError('match.notOpen');

        if (match.masterUserId === user.id) throw new EventError('match.masterUserCantLeave');

        for (let i = 0; i < match.slots.length; i++) {
            if (match.slots[i].user !== null && match.slots[i].user.id === user.id) {
                match.slots[i].user = null;

                this.sendUpdateToSubscribers(match, 'slots', match.slots);

                this.gameSendFunction(match.getGameSocket(), 'user.left', {
                    slotIndex: i,
                    user: user
                });

                return true;
            }
        }

        throw new EventError('match.notJoined');
    };

    this.cancelMatch = function(matchId, socketId) {
        if (typeof this.matches[matchId] === 'undefined') throw new EventError('match.notExisting');

        let user = this._loadUser(socketId);
        if (user === null) throw new EventError('match.notLoggedIn');

        let match = this.matches[matchId];
        if (match.state !== 'open') throw new EventError('match.notOpen');

        if (match.masterUserId !== user.id) throw new EventError('match.notMasterUser');

        if (match.getGameProcess()) {
            match.getGameProcess().kill();
            match.setGameProcess(null);
        }

        match.setState('canceled');

        this.sendUpdateToSubscribers(match, 'state', match.state);
    };

    this.startMatch = function(matchId, socketId) {
        if (typeof this.matches[matchId] === 'undefined') throw new EventError('match.notExisting');

        let user = this._loadUser(socketId);
        if (user === null) throw new EventError('match.notLoggedIn');

        let match = this.matches[matchId];
        if (match.state !== 'open') throw new EventError('match.notOpen');

        if (match.masterUserId !== user.id) throw new EventError('match.notMasterUser');

        match.setState('running');

        this.sendUpdateToSubscribers(match, 'state', match.state);

        this.gameSendFunction(match.getGameSocket(), 'match.started');
    };

    this.finishMatch = function(matchId) {
        if (typeof this.matches[matchId] === 'undefined') throw new EventError('match.notExisting');

        let match = this.matches[matchId];
        if (match.state !== 'running') throw new EventError('match.notRunning');

        if (match.getGameProcess()) {
            match.getGameProcess().kill();
            match.setGameProcess(null);
        }

        match.setState('finished');
        this.sendUpdateToSubscribers(match, 'state', match.state);
    };

    this.handleMethod = function(matchId, elementId, method, socketId, methodData) {
        if (typeof this.matches[matchId] === 'undefined') throw new MethodError('match.notExisting');

        let user = this._loadUser(socketId);
        if (user === null) throw new MethodError('match.notLoggedIn');

        //Match validation
        let match = this.matches[matchId];
        if (match.state !== 'running') throw new MethodError('match.notRunning');

        //User validation
        let slotIndex = null;
        for (let i = 0; i < match.slots.length; i++) {
            if (match.slots[i].user !== null && match.slots[i].user.id === user.id) {
                slotIndex = i;
            }
        }
        if (slotIndex === null) throw new MethodError('match.notJoined');

        //Element validation
        let transferData = match.handleElementMethod(elementId, method, methodData, slotIndex);

        this.gameSendFunction(match.getGameSocket(), 'match.method', {
            elementId: elementId,
            method: method,
            slotIndex: slotIndex,
            data: transferData
        });
    };

    this.openMatch = function(socketId, matchId) {
        try {
            this.closeMatch(socketId);
        } catch (e) {}

        this.subscriptions.push({
            socketId: socketId,
            matchId: matchId
        });
    };

    this.closeMatch = function(socketId) {
        for (let i = 0; i < this.subscriptions.length; i++) {
            if (this.subscriptions[i].socketId === socketId) {
                this.subscriptions.splice(i, 1);
                return;
            }
        }

        throw new EventError('match.cannotUnsubscribe');
    };

    this.sendUpdateToSubscribers = function(match, updateKey, updateData) {
        for (let i = 0; i < this.subscriptions.length; i++) {
            if (this.subscriptions[i].matchId === match.id) {
                if (typeof updateData === 'function') {
                    try {
                        let result = updateData(this.getSlotIndexBySocketId(match, this.subscriptions[i].socketId));
                        if (result !== null) {
                            this.frontendEmitter.emit('sendToSocket', this.subscriptions[i].socketId, 'match.update', {key: updateKey, data: result});
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    try {
                        this.frontendEmitter.emit('sendToSocket', this.subscriptions[i].socketId, 'match.update', {key: updateKey, data: updateData});
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        }
    };

    this.getSlotIndexBySocketId = function(match, socketId) {
        let user = this._loadUser(socketId);
        if (!user) return null;

        for (let i = 0; i < match.slots.length; i++) {
            if (match.slots[i].user !== null && match.slots[i].user.id === user.id) {
                return i;
            }
        }
        return null;
    };

    this.findAll = function() {
        let matches = [];
        for (let i in this.matches) {
            if (!this.matches.hasOwnProperty(i)) continue;

            matches.push(this.matches[i]);
        }
        return matches;
    };

    this.findByGameSocket = function(socket) {
        for (let i in this.matches) {
            if (!this.matches.hasOwnProperty(i)) continue;

            if (this.matches[i].getGameSocket() === socket) {
                return this.matches[i];
            }
        }

        throw new EventError('match.notFound');
    };

    this.findById = function(id) {
        if (typeof this.matches[id] === 'undefined') throw new EventError('match.notFound');

        return this.matches[id];
    };

    this.findByGameKey = function(gameKey) {
        let matches = [];

        if (!gameService.isValidKey(gameKey)) throw new EventError('match.gameKeyInvalid');

        for (let i in this.matches) {
            if (!this.matches.hasOwnProperty(i)) continue;

            if (this.matches[i].game.key === gameKey) {
                matches.push(this.matches[i]);
            }
        }

        return matches;
    };

    this.registerGameEvents = function(eventEmitter, sendFunction) {
        this.gameSendFunction = sendFunction;

        eventEmitter.on('connectionOpened', function(socket) {
            sendFunction(socket, 'match.requestingAuth');
        });

        eventEmitter.on('match.auth', function(socket, data) {
            try {
                let match = self.findById(data);

                if (match.getGameSocket() !== null) {
                    throw new EventError('match.authError');
                }

                match.setGameSocket(socket);

                sendFunction(socket, 'match.authed', {
                    settings: match.settings,
                    slots: match.slots
                });
            } catch (e) {
                if (e instanceof EventError) {
                    sendFunction(socket, 'match.error', e.key);
                } else {
                    sendFunction(socket, 'unkownError', e.name + ': ' + e.message + ' (' + JSON.stringify(e.stack) + ')');
                }
            }
        });

        eventEmitter.on('event', function(socket, data) {
            try {
                self.findByGameSocket(socket).handleEvent(data.event, data);
            } catch (e) {
                if (e instanceof EventError) {
                    sendFunction(socket, e.key);
                } else {
                    sendFunction(socket, 'unkownError', e.name + ': ' + e.message + ' (' + JSON.stringify(e.stack) + ')');
                }
            }
        });

        eventEmitter.on('connectionClosed', function(socket) {
            try {
                self.cancelMatch(self.findByGameSocket(socket).id);
            } catch (e) {}
        });

        eventEmitter.on('finish', function(socket) {
            try {
                self.finishMatch(self.findByGameSocket(socket).id);
            } catch (e) {
                if (e instanceof EventError) {
                    sendFunction(socket, e.key);
                } else {
                    sendFunction(socket, 'unkownError', e.name + ': ' + e.message + ' (' + JSON.stringify(e.stack) + ')');
                }
            }
        });
    };

    this.registerFrontendEvents = function(eventEmitter) {
        this.frontendEmitter = eventEmitter;
        /**
         * Request:
         * {"action": "match.getList", "data": {"gameKey": "foobar"}}
         *
         * Response:
         * {"data": [{
         *     todo
         * }, ...]}
         */
        eventEmitter.on('match.getList', function(socketId, data, callback, errorCallback) {
            try {
                if (data.gameKey) callback(self.findByGameKey(data.gameKey));
                else callback(self.findAll());
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.getMatch", "data": {"matchId": 1}}
         *
         * Response:
         * {"data": {
         *     todo
         * }}
         */
        eventEmitter.on('match.getMatch', function(socketId, data, callback, errorCallback) {
            try {
                let match = self.findById(data.matchId);

                callback(match.transformToFrontend(self.getSlotIndexBySocketId(match, socketId)));
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.openMatch", "data": {"matchId": 1}}
         *
         * Response:
         * {"data": {
         *      todo
         * }}
         */
        eventEmitter.on('match.openMatch', function(socketId, data, callback, errorCallback) {
            try {
                let match = self.findById(data.matchId);
                self.openMatch(socketId, match.id);

                callback(match.transformToFrontend(self.getSlotIndexBySocketId(match, socketId)));
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.closeMatch"}
         *
         * Response:
         * {"data": true}
         */
        eventEmitter.on('match.closeMatch', function(socketId, data, callback, errorCallback) {
            try {
                self.closeMatch(socketId);
                callback(true);
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.create", "data": {"gameKey": "gcs-game-tictactoephp", "settings": {"colorScheme": "default"}}
         *
         * Response:
         * {"data": 1} //created matchId
         */
        eventEmitter.on('match.create', function(socketId, data, callback, errorCallback) {
            try {
                let match = self.createMatch(data.gameKey, data.settings, socketId);
                callback(match.id);
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.join", "data": {"matchId": 1, "index": 0}}
         *
         * Response:
         * {"data": true}
         */
        eventEmitter.on('match.join', function(socketId, data, callback, errorCallback) {
            try {
                self.joinMatch(data.matchId, socketId, data.index);
                callback(true);
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.switchSlot", "data": {"matchId": 1, "index": 0}}
         *
         * Response:
         * {"data": true}
         */
        eventEmitter.on('match.switchSlot', function(socketId, data, callback, errorCallback) {
            try {
                self.switchSlot(data.matchId, socketId, data.index);
                callback(true);
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.leave", "data": {"matchId": 1}}
         *
         * Response:
         * {"data": true}
         */
        eventEmitter.on('match.leave', function(socketId, data, callback, errorCallback) {
            try {
                self.leaveMatch(data.matchId, socketId);
                callback(true);
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.cancel", "data": {"matchId": 1}}
         *
         * Response:
         * {"data": true}
         */
        eventEmitter.on('match.cancel', function(socketId, data, callback, errorCallback) {
            try {
                self.cancelMatch(data.matchId, socketId);
                callback(true);
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.start", "data": {"matchId": 1}}
         *
         * Response:
         * {"data": true}
         */
        eventEmitter.on('match.start', function(socketId, data, callback, errorCallback) {
            try {
                self.startMatch(data.matchId, socketId);
                callback(true);
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "match.method", "data": {"matchId": 1, "elementId": "someElement", "method": "dice.roll", "data": {"someIndividualField": 1}}}
         *
         * Response:
         * {"data": true}
         */
        eventEmitter.on('match.method', function(socketId, data, callback, errorCallback) {
            try {
                self.handleMethod(data.matchId, data.elementId, data.method, socketId, data.data);
                callback(true);
            } catch (e) {
                if (e instanceof MethodError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });
    };
})();