'use strict';

module.exports = GameModel;

function GameModel(data) {
    this.key = data.key || null;
    this.name = data.name || data.key || 'Unbenannt';
    this.description = data.description || null;
    this.version = data.version || '1.0.0';

    this.minPlayers = data.minPlayers || 1;
    this.maxPlayers = data.maxPlayers || 4;
    this.slotColors = data.slotColors || ['#ff0000', '#0000ff', '#00ff00', '#ffff00'];

    let path = data.path || null;
    let command = data.command || null;

    this.contractWithOwner = data.contractWithOwner || false;

    this.setPath = function(input) {
        path = input;
    };
    this.getPath = function() {
        return path;
    };

    this.setCommand = function(input) {
        command = input;
    };
    this.getCommand = function() {
        return command;
    };
}