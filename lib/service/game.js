module.exports = new (function() {
    this.registerEvents = function(eventEmitter) {
        eventEmitter.on('game.getTypes', function() {
        
        });
        
        eventEmitter.on('game.create', function(gameType, settings) {
        
        });
        
        eventEmitter.on('game.getList', function() {
        
        });
        
        eventEmitter.on('game.join', function(gameId) {
        
        });
        
        eventEmitter.on('game.start', function() {
        
        });
        
        eventEmitter.on('game.command', function(data) {
        
        });
    }
})();