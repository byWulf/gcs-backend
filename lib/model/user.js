'use strict';

module.exports = User;

function user(id, displayName, socket) {
    this.id = id;
    this.displayName = displayName;
    this.socket = socket;

    this.sendCommand = function(action, data) {
        this.socket.write(JSON.stringify({
            action: action,
            data: data
        }) + String.fromCharCode(0));
    };

    this.sendCommand('user.ownDetails', {
        id: this.id,
        displayName: this.displayName
    });
}