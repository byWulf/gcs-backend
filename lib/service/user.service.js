'use strict';

const User = require('../model/user');
const EventEmitter = require('events');

module.exports = new (function() {
    let self = this;

    const userNames = ['Flitterring', 'Catcast',  'Clovergaze',  'Swampcharm',  'Quickshy',  'Wartcast',  'Cacklecurse',  'Beetlebug',  'Goldwing',  'Badsmoke',  'Frogstench',  'Beetlesquawk',  'Demonweed',  'Startlebone',  'Swampgoo',  'Leatherbug',  'Appleleaf',  'Spidercharm',  'Mooneyes',  'Newthowl',  'Giggleberry',  'Bloodtongue',  'Demonfist', 'Flutterbreeze', 'Goldkiss', 'Honeyflower', 'Goldring', 'Stewstench', 'Honeydust', 'Snowgaze', 'Silverdance', 'Shadowhowl', 'Flitterberry', 'Twinklesmile', 'Gentlering', 'Sparklestar', 'Sugarshy', 'Bristlecurse', 'Twinklebreeze', 'Swamptooth', 'Flamebug', 'Toadsquawk', 'Blackgnash', 'Honeystar', 'Flitterkiss', 'Silverstar', 'Clearglow', 'Demongnash', 'Moonfluff'];

    let users = [];
    let nextUserId = 1;

    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on('error', function(data) {});

    this.createUser = function(sendMethod) {
        let user = new User(
            0,
            'Guest',
            sendMethod
        );
        users.push(user);

        user.sendCommand('user.ownDetails', user);

        return user;
    };

    this.register = function(user) {
        user.id = nextUserId;
        user.displayName = userNames[nextUserId % userNames.length] + ' #' + (Math.floor(nextUserId / userNames.length) + 1);

        nextUserId++;

        return user;
    };

    this.login = function(user, userId) {
        user.id = userId;
        user.displayName = userNames[userId % userNames.length] + ' #' + (Math.floor(userId / userNames.length) + 1);

        if (userId >= nextUserId) {
            nextUserId = userId + 1;
        }

        return user;
    };

    this.logout = function(user) {
        if (user.id === 0) throw new EventError('user.notLoggedIn');

        let sendMethod = user.sendMethod;

        this.removeUser(user);

        return this.createUser(sendMethod);
    };

    this.removeUser = function(user) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === user.id) {
                users.splice(i, 1);
            }
        }

        this.eventEmitter.emit('userRemoved', user);
    };

    this.findById = function(userId) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                return users[i];
            }
        }

        throw new EventError('user.notFound');
    };

    this.registerEvents = function(eventEmitter) {
        /**
         * Request:
         * {"action": "user.register"}
         *
         * Response:
         * {"data": user}
         */
        eventEmitter.on('user.register', function(user, data, callback, errorCallback) {
            try {
                callback(self.register(user));
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
         * {"action": "user.login", "data": 12}
         *
         * Response:
         * {"data": user}
         */
        eventEmitter.on('user.login', function(user, data, callback, errorCallback) {
            try {
                callback(self.login(user, data));
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
         * {"action": "user.logout"}
         *
         * Response:
         * {"data": user}
         */
        eventEmitter.on('user.logout', function(user, data, callback, errorCallback) {
            try {
                callback(self.logout(user));
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });
    }
})();