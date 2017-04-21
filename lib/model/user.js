'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = User;

function User(id, displayName, email) {
    const self = this;

    this.id = id;
    this.email = email;
    this.displayName = displayName;
    let socketIds = [];
    let passwordHash = null;
    let authToken = null;

    this.setPassword = function(password) {
        bcrypt.hash(password, 10).then(function(hash) {
            passwordHash = hash;
        });
        authToken = crypto.randomBytes(20).toString('hex');
    };

    this.getAuthToken = function() {
        return authToken;
    };

    this.checkPassword = function(password) {
        if (passwordHash === null) {
            return new Promise((resolve, reject) => {
                resolve(false);
            });
        }

        return bcrypt.compare(password, passwordHash);
    };

    this.addSocket = function(socketId) {
        socketIds.push(socketId);
    };

    this.removeSocket = function(socketId) {
        if (socketIds.indexOf(socketId) > -1) {
            socketIds.splice(socketIds.indexOf(socketId), 1);
        }
    };
}