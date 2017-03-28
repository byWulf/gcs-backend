'use strict';

module.exports = TileContainer;

function TileContainer(data) {
    let tileForm = 'square'; //square, hexagonal, triangular
    let stackElementRadius = 5;

    this.setTileForm = function(value) {
        tileForm = value;
    };

    this.setStackElementRadius = function(value) {
        stackElementRadius = value;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            tileForm: tileForm,
            stackElementRadius: stackElementRadius
        }
    };

    this.setTileForm(data.tileForm);
    this.setStackElementRadius(data.stackElementRadius);
}