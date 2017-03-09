'use strict';

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const GameModel = require('../model/game');
const EventError = require('../error/eventError');

module.exports = new (function() {
    let self = this;

    let games = [];
    this.eventEmitter = null;

    this.findAll = function() {
        return games;
    };

    this.findByKey = function(key) {
        for (let i = 0; i < games.length; i++) {
            if (games[i].key === key) {
                return games[i];
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
    };

    this.registerGame = function(moduleName) {
        let modulePath = path.dirname(require.resolve(moduleName));
        let config = JSON.parse(fs.readFileSync(modulePath + '/game.json'));

        if (!config) throw new Error('registerGame: no game.json file');
        if (!config.key) throw new Error('registerGame: invalid key');
        if (!config.name) throw new Error('registerGame: name missing');
        if (!config.name) throw new Error('registerGame: name missing');

        for (let i = 0; i < games.length; i++) {
            if (games[i].key === config.key) throw new Error('registerGame: key "' + config.key + '" already registered');
        }

        config.path = modulePath;

        let game = new GameModel(config);

        games.push(game);

        this.eventEmitter.emit('gameAdded', game);
        console.log("Game " + game.name + " registered.");
    };

    this.init = function() {
        this.eventEmitter = new EventEmitter();
        this.eventEmitter.on('error', function(data) {});
    };

    this.init();
})();