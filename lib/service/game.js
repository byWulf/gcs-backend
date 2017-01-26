module.exports = new (function() {
    this.registerEvents = function(eventEmitter) {
        eventEmitter.on('gameGetTypes', function() {
        
        });
        
        eventEmitter.on('gameCreate', function(gameType, settings) {
        
        });
        
        eventEmitter.on('gameGetList', function() {
        
        });
        
        eventEmitter.on('gameJoin', function(gameId) {
        
        });
        
        eventEmitter.on('gameStart', function() {
        
        });
        
        eventEmitter.on('gameCommand', function(data) {
        
        });
    }
})();