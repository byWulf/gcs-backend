'use strict';

const GameModel = require('../model/game');
const EventError = require('../error/eventError');

const GAMES = [
    new GameModel({ key: 'maedn', name: 'Mensch ärgere dich nicht', description: 'Versuche deine vier Figuren als erster einmal ums Spielbrett herum zu führen und sicher in der Mitte zu platzieren. Aber vorsicht: Die anderen Spieler können deine Figuren vom Spielfeld fegen, welche dadurch wieder am Anfang landen.' }),
    new GameModel({ key: 'maumau', name: 'Mau Mau', description: 'Wenn du es schaffst, als erster alle deine Karten durch Ablegen loszuwerden, gewinnst du. Vergiss aber blos nicht "Mau" oder "Mau Mau" zu rufen!' })
];

module.exports = new (function() {
    let self = this;

    this.findAll = function() {
        return GAMES;
    };

    this.findByKey = function(key) {
        for (let i = 0; i < GAMES.length; i++) {
            if (GAMES[i].key === key) {
                return GAMES[i];
            }
        }
        throw new EventError('game.notFound');
    };

    this.isValidKey = function(key) {
        try {
            return this.findByKey(key) !== null;
        } catch (e) {
            return false;
        }
    };

    this.registerFrontendEvents = function(eventEmitter) {
        /**
         * Request:
         * {"action": "game.getAll"}
         *
         * Response:
         * {"data": [{
         *     "key": "maedn",
         *     "name": "Mensch ärgere dich nicht",
         *     "description": "Some description about the game..."
         * }, ...]}
         */
        eventEmitter.on('game.getList', function(user, data, callback, errorCallback) {
            try {
                callback(self.findAll());
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
         * {"action": "game.getByKey", data: {"key": "maedn"}}
         *
         * Response:
         * {"data": {
         *     "key": "maedn",
         *     "name": "Mensch ärgere dich nicht",
         *     "description": "Some description about the game..."
         * }}
         */
        eventEmitter.on('game.getByKey', function(user, data, callback, errorCallback) {
            try {
                callback(self.findByKey(data.key));
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