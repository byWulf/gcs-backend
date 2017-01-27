module.exports = GameModel;

function GameModel() {
    this.id = null;

    this.type = null;

    this.settings = {};

    this.state = 'open';
}