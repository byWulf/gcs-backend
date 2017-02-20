'use strict';

const FrontendCommunicator = require('./lib/frontendCommunicator');
let frontendCommunicator = new FrontendCommunicator(3701);

const GameCommunicator = require('./lib/frontendCommunicator');
let gameCommunicator = new FrontendCommunicator(3701);

const chatService = require('./lib/service/chat');
chatService.registerEvents(frontendCommunicator.eventEmitter);

const gameService = require('./lib/service/game');
gameService.registerFrontendEvents(frontendCommunicator.eventEmitter);
gameService.registerGameEvents(gameCommunicator.eventEmitter);

const newsService = require('./lib/service/news');
newsService.registerEvents(frontendCommunicator.eventEmitter);