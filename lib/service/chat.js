module.exports = new (function() {
    this.registerEvents = function(eventEmitter) {
        eventEmitter.on('chat.joinRoom', function(roomId, message) {

        });
        eventEmitter.on('chat.leaveRoom', function(roomId, message) {

        });
        eventEmitter.on('chat.addMessage', function(roomId, message) {

        });
    }
})();