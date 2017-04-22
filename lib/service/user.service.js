'use strict';

const EventEmitter = require('events');
const EventError = require('../error/eventError');
const databaseCommunicator = require('../databaseCommunicator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = new (function() {
    let self = this;

    let sockets = {};

    this.eventEmitter = new EventEmitter();
    this.eventEmitter.on('error', function(data) {});

    this.register = function(socketId, username, email, password) {
        return new Promise((resolve, reject) => {
            let user = {
                displayName: username,
                displayName_canonical: username.toLowerCase(),
                email: email,
                email_canonical: email.toLowerCase(),
                authToken: crypto.randomBytes(20).toString('hex')
            };

            let errors = [];
            if (password.length < 8) {
                errors.push({field: 'password', description: 'Passwort muss mindestens 8 Zeichen lang sein.'});
            }
            if (username.length < 3) {
                errors.push({field: 'username', description: 'Username muss mindestens 3 Zeichen lang sein.'});
            }
            if (email.length < 4 || !/^.+@.+\..+$/.test(email)) {
                errors.push({field: 'email', description: 'Email ist nicht gültig.'});
            }
            databaseCommunicator.findOne('users', {displayName: username}).then(doc => {
                if (doc) {
                    errors.push({field: 'username', description: 'Username wird bereits verwendet.'});
                }
                return databaseCommunicator.findOne('users', {email: email});
            }).then(doc => {
                if (doc) {
                    errors.push({field: 'email', description: 'Email wird bereits verwendet.'});
                }
                return databaseCommunicator.findOne('users', {email: username});
            }).then(doc => {
                if (doc) {
                    errors.push({
                        field: 'username',
                        description: 'Username wird bereits als Email bei einem anderen User verwendet.'
                    });
                }
                return databaseCommunicator.findOne('users', {displayName: email});
            }).then(doc => {
                if (doc) {
                    errors.push({
                        field: 'email',
                        description: 'Email wird bereits als Username bei einem anderen User verwendet.'
                    });
                }

                if (errors.length) {
                    throw new EventError('register.fieldErrors', errors);
                }

                return bcrypt.hash(password, 10);
            }).then(passwordHash => {
                user.passwordHash = passwordHash;

                return databaseCommunicator.insert('users', user);
            }).then(userDocument => {
                sockets[socketId] = userDocument;

                resolve(userDocument);
            }).catch(err => {
                reject(err);
            });
        });
    };

    /**
     * @param socketId
     * @param usernameOrEmail
     * @param password
     * @returns Promise
     */
    this.login = function(socketId, usernameOrEmail, password) {
        return new Promise((resolve, reject) => {
            if (sockets[socketId]) {
                throw new EventError('login.userAlreadyLoggedIn');
            }

            let user = null;
            databaseCommunicator.findOne('users', {$or: [{displayName_canonical: usernameOrEmail.toLowerCase()}, {email_canonical: usernameOrEmail.toLowerCase()}]}).then(userDocument => {
                if (!userDocument) throw 'login.invalid';

                user = userDocument;

                return bcrypt.compare(password, user.passwordHash);
            }).then(isValid => {
                if (!isValid) throw 'login.invalid';

                sockets[socketId] = user;

                resolve(user);
            }).catch(err => {
                reject(err);
            });
        });
    };

    this.loginByAuthToken = function(socketId, userId, authToken) {
        return new Promise((resolve, reject) => {
            if (sockets[socketId]) {
                throw new EventError('login.userAlreadyLoggedIn');
            }

            databaseCommunicator.findOne('users', {_id: userId, authToken: authToken}).then(userDocument => {
                if (!userDocument) throw 'login.invalid';

                sockets[socketId] = userDocument;

                resolve(userDocument);
            }).catch(err => {
                reject(err);
            });
        });
    };

    this.logout = function(socketId) {
        return new Promise((resolve, reject) => {
            delete sockets[socketId];

            resolve(true);
        });
    };

    this.findBySocketId = function(socketId) {
        if (sockets[socketId]) {
            return sockets[socketId];
        }

        return null;
    };

    this.registerEvents = function(eventEmitter) {
        /**
         * Request:
         * {"action": "user.register", "data": {"username": "Wulf", "email": "wulf1337@gmail.com", "password": "NotMyRealPassword"}}
         *
         * Response:
         * {"data": {"id": "asdf", "displayName": "Wulf", "authToken": authToken}}
         */
        eventEmitter.on('user.register', (socketId, data, callback, errorCallback) => {
            try {
                this.register(socketId, data.username, data.email, data.password).then(user => {
                    callback({
                        id: user._id.toString(),
                        displayName: user.displayName,
                        authToken: user.authToken
                    });
                }).catch(e => {
                    if (e instanceof EventError) {
                        errorCallback(e.key, e.data);
                    } else {
                        errorCallback('unkownError', e.name + ': ' + e.message);
                    }
                });
            } catch (e) {
                errorCallback('unkownError', e.name + ': ' + e.message);
            }
        });

        /**
         * Request:
         * {"action": "user.login", "data": {"usernameOrEmail": "Wulf", "password": "notMyRealPassword"}}
         *
         * Response:
         * {"data": {"id": "asdf", "displayName": "Wulf", "authToken": authToken}}
         */
        eventEmitter.on('user.login', (socketId, data, callback, errorCallback) => {
            try {
                this.login(socketId, data.usernameOrEmail, data.password).then(function(user) {
                    callback({
                        id: user._id.toString(),
                        displayName: user.displayName,
                        authToken: user.authToken
                    });
                }).catch(function(e) {
                    if (e instanceof EventError) {
                        errorCallback(e.key);
                    } else {
                        errorCallback('unkownError', e.name + ': ' + e.message);
                    }
                });
            } catch (e) {
                errorCallback('unkownError', e.name + ': ' + e.message);
            }
        });

        /**
         * Request:
         * {"action": "user.loginByAuthToken", "data": {"userId": 1, "authToken": "bb5dc8842ca31d4603d6aa11448d1654"}}
         *
         * Response:
         * {"data": {"user": user, "authToken": authToken}}
         */
        eventEmitter.on('user.loginByAuthToken', (socketId, data, callback, errorCallback)  => {
            try {
                this.loginByAuthToken(socketId, data.userId, data.authToken).then(function(user) {
                    callback({
                        id: user._id.toString(),
                        displayName: user.displayName,
                        authToken: user.authToken
                    });
                }).catch(function(e) {
                    if (e instanceof EventError) {
                        errorCallback(e.key);
                    } else {
                        errorCallback('unkownError', e.name + ': ' + e.message);
                    }
                });
            } catch (e) {
                errorCallback('unkownError', e.name + ': ' + e.message);
            }
        });

        /**
         * Request:
         * {"action": "user.logout"}
         *
         * Response:
         * {"data": true}
         */
        eventEmitter.on('user.logout', (socketId, data, callback, errorCallback) => {
            try {
                this.logout(socketId).then(function(successful) {
                    callback(successful);
                }).catch(function(e) {
                    if (e instanceof EventError) {
                        errorCallback(e.key);
                    } else {
                        errorCallback('unkownError', e.name + ': ' + e.message);
                    }
                });
            } catch (e) {
                errorCallback('unkownError', e.name + ': ' + e.message);
            }
        });
    }
})();