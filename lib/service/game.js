'use strict';

const GameModel = require('../model/game');

module.exports = new (function() {
    let self = this;

    this.games = {};
    this.nextGameId = 1;

    this.getTypes = function() {

    };

    this.create = function(gameType, settings) {
        let gameId = this.nextGameId++;

        let game = this.games[gameId] = new GameModel();
        game.id = gameId;
        game.type = gameType;
        game.settings = settings;
    };

    this.cancelGame = function(game) {
        for (let i = 0; i < game.users.length; i++) {
            game.users[i].sendCommand('game.canceled');
        }
    };

    this.findGameByGameSocket = function(socket) {
        for (let i in this.games) {
            if (!this.games.hasOwnProperty(i)) continue;

            if (this.games[i].gameSocket === socket) {
                return this.games[i];
            }
        }

        return null;
    };

    this.findGameByUser = function(user) {
        for (let i in this.games) {
            if (!this.games.hasOwnProperty(i)) continue;

            for (let j = 0; j < this.games[i].users.length; j++) {
                if (this.games[i].users[j] === user) {
                    return this.games[i];
                }
            }
        }

        return null;
    };

    this.findGameById = function(id) {
        if (typeof this.games[id] === 'undefined') return null;

        return this.games[id];
    };

    this.registerGameEvents = function(eventEmitter) {
        eventEmitter.on('connectionOpened', function(socket) {
            self.sendCommand(socket, 'game.auth');
        });

        eventEmitter.on('game.auth', function(socket, data) {
            let game = self.findGameById(data.id);

            if (game === null) {
                self.sendCommand(socket, 'game.authError', 'invalidId');
            }
            if (game.socket !== null) {
                self.sendCommand(socket, 'game.authError', 'alreadyConnected');
            }

            game.socket = socket;

            game.sendCommand('game.start');
        });

        eventEmitter.on('event', function(socket, data) {
            let game = self.findGameByGameSocket(socket);

            if (game === null) {
                self.sendCommand(socket, 'game.eventError', 'gameNotFound');
            }

            game.handleEvent(data.event, data);
        });

        eventEmitter.on('connectionClosed', function(socket) {
            let game = self.findGameByGameSocket(socket);
            if (game !== null) {
                self.cancelGame(game);
            }
        });
    };

    this.registerFrontendEvents = function(eventEmitter) {
        /**
         * Request:
         * {"action": "game.getTypes"}
         *
         * Response:
         * {"action": "game.getTypes", data: {
         *      "types": [{
         *          "key": "gcs-game-tictactoephp",
         *          "name": "Tic Tac Toe (PHP-Version)",
         *          "description": "A game no one can win.",
         *          "meanDuration": 1, //in minutes
         *          "minPlayers": 2,
         *          "maxPlayers": 2,
         *          "neededFeatures": ["todo",...],
         *          "settings": [{
         *              "key": "colorScheme",
         *              "name": "Color scheme",
         *              "description": "Change the colors of the X's and O's.",
         *              "type": "select",
         *              "values": [{
         *                  "key": "default",
         *                  "name": "Default"
         *              }, ...]
         *          }, ...]
         *      }, ...]
         * }
         */
        eventEmitter.on('game.getTypes', function(user) {
        
        });

        /**
         * Request:
         * {"action": "game.create", "data": {"gameType": "gcs-game-tictactoephp", "settings": {"colorScheme": "default"}}
         *
         * Response:
         * {"action": "game.open", "data": {
         *      "game": {
         *          todo
         *      }
         * }
         */
        eventEmitter.on('game.create', function(user, gameType, settings) {
        
        });

        /**
         * Request:
         * {"action": "game.getList"}
         *
         * Response:
         * {"action": "game.list", "data": {
         *      "games": [{
         *          todo
         *      }, ...]
         * }
         */
        eventEmitter.on('game.getList', function(user) {
        
        });

        /**
         * Request:
         * {"action": "game.join", "data": {"gameId": 123}}
         *
         * Response:
         * {"action": "game.open", "data": {
         *      "game": {
         *          todo
         *      }
         * }
         */
        eventEmitter.on('game.join', function(user, gameId) {
        
        });

        /**
         * Request:
         * {"action": "game.start"}
         *
         * Response:
         * -none-
         */
        eventEmitter.on('game.start', function(user) {
        
        });

        /**
         * Request:
         * {"action": "game.method", "data": {"mixed": "content"}}
         *
         * Response:
         * -mixed-
         */
        eventEmitter.on('game.method', function(user, data) {
            let game = self.findGameByUser(user);

            if (game !== null) {
                //TODO: Validate method
                game.sendCommand('elementMethod', {
                    player: game.getPlayerIndexByUser(user),
                    method: data.method,
                    elementId: data.elementId
                })
            }
        });
    }
})();