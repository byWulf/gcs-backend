module.exports = new (function() {
    this.registerEvents = function(eventEmitter) {
        eventEmitter.on('chatAddMessage', function(roomId, message) {

        });
    }
})();