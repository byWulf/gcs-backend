var FrontendCommunicator = require('./lib/frontendCommunicator');
var frontendCommunicator = new FrontendCommunicator(3701);

var chatService = require('./lib/service/chat');
chatService.registerEvents(frontendCommunicator.eventEmitter);

var gameService = require('./lib/service/game');
gameService.registerEvents(frontendCommunicator.eventEmitter);

var newsService = require('./lib/service/news');
newsService.registerEvents(frontendCommunicator.eventEmitter);