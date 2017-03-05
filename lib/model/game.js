'use strict';

module.exports = GameModel;

function GameModel(data) {
    this.key = data.key || null;
    this.name = data.name || null;
    this.description = data.description || null;
}