'use strict';

module.exports = MatchModel;

function MatchModel() {
    this.gameSocket = null;

    this.id = null;

    this.game = null;

    this.settings = {};

    this.state = 'open';

    this.masterUser = null;

    this.slots = [];

    this.elements = {};

    this.sendCommand = function(action, data) {
        if (this.gameSocket !== null) {
            this.gameSocket.write(JSON.stringify({
                action: action,
                data: data
            }) + String.fromCharCode(0));
        }
    };

    this.handleEvent = function(event, data) {
        if (event === 'element.added') {
            this.addElement(data);
        }

        if (event === 'element.removed') {
            this.removeElement(data);
        }

        if (event === 'element.moved') {
            this.moveElement(data);
        }

        if (event === 'information.error') {
            this.sendInformationError(data);
        }

        if (
            typeof data.id !== 'undefined' &&
            typeof this.elements[data.id] !== 'undefined' &&
            typeof this.elements[data.id].onEvent === 'function'
        ) {
            this.elements[data.id].onEvent(event, data);
        }
    };

    this.addElement = function(data) {

    };

    this.removeElement = function(data) {

    };

    this.moveElement = function(data) {

    };

    this.sendInformationError = function(data) {

    };
}