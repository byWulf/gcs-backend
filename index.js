'use strict';

const FrontendCommunicator = require('./lib/frontendCommunicator');
let frontendCommunicator = new FrontendCommunicator({
    tcp: 3701,
    websocket: 3700
});

const GameCommunicator = require('./lib/gameCommunicator');
let gameCommunicator = new GameCommunicator(3702);

const gameService = require('./lib/service/game.service');
gameService.registerFrontendEvents(frontendCommunicator.eventEmitter);

const userService = require('./lib/service/user.service');
userService.registerEvents(frontendCommunicator.eventEmitter);

const matchService = require('./lib/service/match.service');
matchService.registerFrontendEvents(frontendCommunicator.eventEmitter);
matchService.registerGameEvents(gameCommunicator.eventEmitter);
matchService.registerUserEvents(userService.eventEmitter);