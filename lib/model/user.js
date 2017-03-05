'use strict';

module.exports = User;

function User(id, displayName, sendMethod) {
    const self = this;

    this.id = id;
    this.displayName = displayName;
    this.sendMethod = sendMethod;

    this.sendCommand = function(action, data) {
        this.sendMethod(action, data);
    };
}