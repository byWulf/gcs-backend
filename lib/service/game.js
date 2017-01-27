const GameModel = require('../model/game');

module.exports = new (function() {
    this.games = {};
    this.nextGameId = 1;

    this.getTypes = function() {

    };

    this.create = function(gameType, settings) {
        var gameId = this.nextGameId++;

        var game = this.games[gameId] = new GameModel();
        game.id = gameId;
        game.type = gameType;
        game.settings = settings;
    };

    this.registerEvents = function(eventEmitter) {
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
        eventEmitter.on('game.getTypes', function() {
        
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
        eventEmitter.on('game.create', function(gameType, settings) {
        
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
        eventEmitter.on('game.getList', function() {
        
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
        eventEmitter.on('game.join', function(gameId) {
        
        });

        /**
         * Request:
         * {"action": "game.start"}
         *
         * Response:
         * -none-
         */
        eventEmitter.on('game.start', function() {
        
        });

        /**
         * Request:
         * {"action": "game.command", "data": {"mixed": "content"}}
         *
         * Response:
         * -mixed-
         */
        eventEmitter.on('game.command', function(data) {
        
        });
    }
})();