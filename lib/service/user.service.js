'use strict';

const User = require('../model/user');
const EventEmitter = require('events');
const EventError = require('../error/eventError');

module.exports = new (function() {
    let self = this;

    let users = [];
    let sockets = {};
    let nextUserId = 1;

    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on('error', function(data) {});

    this.register = function(socketId, username, email, password) {
        let errors = [];
        for (let user of users) {
            if (user.displayName === username) {
                errors.push({field: 'username', description: 'Username wird bereits verwendet.'});
            }
            if (user.email === email) {
                errors.push({field: 'email', description: 'Email wird bereits verwendet.'});
            }
            if (user.email === username) {
                errors.push({field: 'username', description: 'Username wird bereits als Email bei einem anderen User verwendet.'});
            }
            if (user.username === email) {
                errors.push({field: 'email', description: 'Email wird bereits als Username bei einem anderen User verwendet.'});
            }
        }
        if (password.length < 8) {
            errors.push({field: 'password', description: 'Passwort muss mindestens 8 Zeichen lang sein.'});
        }
        if (username.length < 3) {
            errors.push({field: 'username', description: 'Username muss mindestens 3 Zeichen lang sein.'});
        }
        if (email.length < 4 || !/^.+@.+\..+$/.test(email)) {
            errors.push({field: 'email', description: 'Email ist nicht gültig.'});
        }

        if (errors.length) {
            throw new EventError('register.fieldErrors', errors);
        }

        let user = new User(nextUserId++, username, email);
        user.setPassword(password);

        user.addSocket(socketId);
        sockets[socketId] = user;

        users.push(user);

        return user;
    };

    /**
     * @param socketId
     * @param usernameOrEmail
     * @param password
     * @returns Promise
     */
    this.login = function(socketId, usernameOrEmail, password) {
        if (sockets[socketId]) {
            throw new EventError('login.userAlreadyLoggedIn');
        }

        return new Promise((resolve, reject) => {
            let foundUser = false;
            for (let user of users) {
                if (user.displayName.toLowerCase() === usernameOrEmail.toLowerCase() || user.email.toLowerCase() === usernameOrEmail.toLowerCase()) {
                    foundUser = true;

                    user.checkPassword(password).then(function(isCorrect) {
                        if (isCorrect) {
                            user.addSocket(socketId);
                            sockets[socketId] = user;

                            resolve(user);
                        } else {
                            reject('login.invalid');
                        }
                    });

                    break;
                }
            }

            if (!foundUser) {
                reject('login.invalid');
            }
        });
    };

    this.loginByAuthToken = function(socketId, userId, authToken) {
        if (sockets[socketId]) {
            throw new EventError('login.userAlreadyLoggedIn');
        }

        for (let user of users) {
            if (user.id === userId && user.getAuthToken() === authToken) {
                user.addSocket(socketId);
                sockets[socketId] = user;

                return user;
            }
        }

        throw new EventError('login.invalid');
    };

    this.logout = function(socketId) {
        let user = sockets[socketId];

        if (user) {
            user.removeSocket(socketId);
        }
        delete sockets[socketId];

        return true;
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
         * {"action": "user.register", "data": {"username": "Wulf", "email": "wulf1337@gmail.com", "password": "NotMyRealPassword"}}
         *
         * Response:
         * {"data": {"user": user, "authToken": authToken}}
         */
        eventEmitter.on('user.register', function(socketId, data, callback, errorCallback) {
            try {
                let user = self.register(socketId, data.username, data.email, data.password);
                callback({user: user, authToken: user.getAuthToken()});
            } catch (e) {
                if (e instanceof EventError) {
                    errorCallback(e.key, e.data);
                } else {
                    errorCallback('unkownError', e.name + ': ' + e.message);
                }
            }
        });

        /**
         * Request:
         * {"action": "user.login", "data": {"usernameOrEmail": "Wulf", "password": "notMyRealPassword"}}
         *
         * Response:
         * {"data": {"user": user, "authToken": authToken}}
         */
        eventEmitter.on('user.login', function(socketId, data, callback, errorCallback) {
            try {
                self.login(socketId, data.usernameOrEmail, data.password).then(function(user) {
                    callback({user: user, authToken: user.getAuthToken()});
                }).catch(function(reason) {
                    errorCallback(reason);
                });
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
         * {"action": "user.loginByAuthToken", "data": {"userId": 1, "authToken": "bb5dc8842ca31d4603d6aa11448d1654"}}
         *
         * Response:
         * {"data": {"user": user, "authToken": authToken}}
         */
        eventEmitter.on('user.loginByAuthToken', function(socketId, data, callback, errorCallback) {
            try {
                let user = self.loginByAuthToken(socketId, data.userId, data.authToken);
                callback({user: user, authToken: user.getAuthToken()});
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
         * {"data": true}
         */
        eventEmitter.on('user.logout', function(socketId, data, callback, errorCallback) {
            try {
                callback(self.logout(socketId));
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