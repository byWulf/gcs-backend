'use strict';

const FrontendCommunicator = require('./lib/frontendCommunicator');
let frontendCommunicator = new FrontendCommunicator({
    tcp: 3701,
    websocket: 3700,
    cdn: 3699
});

const GameCommunicator = require('./lib/gameCommunicator');
let gameCommunicator = new GameCommunicator(3702);

const gameService = require('./lib/service/game.service');
gameService.registerFrontendEvents(frontendCommunicator.eventEmitter);
gameService.registerGame('gcs-game-sandbox');
gameService.registerGame('gcs-game-menschaergeredichnicht');

const userService = require('./lib/service/user.service');
userService.registerEvents(frontendCommunicator.eventEmitter);

const matchService = require('./lib/service/match.service');
matchService.registerFrontendEvents(frontendCommunicator.eventEmitter);
matchService.registerGameEvents(gameCommunicator.eventEmitter, gameCommunicator.sendCommand);
matchService.registerUserEvents(userService.eventEmitter);