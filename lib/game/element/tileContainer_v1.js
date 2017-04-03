'use strict';

module.exports = TileContainer;

function TileContainer(data) {
    let tileForm = 'square'; //square, hexagonal, triangular
    let stackElementRadius = 5;
    let stackElementHeight = 0.2;
    let stackElementSpacing = 0.2;

    this.setTileForm = function(value) {
        tileForm = value;
    };

    this.setStackElementRadius = function(value) {
        stackElementRadius = value;
    };

    this.setStackElementHeight = function(value) {
        stackElementHeight = value;
    };

    this.setStackElementSpacing = function(value) {
        stackElementSpacing = value;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            tileForm: tileForm,
            stackElementRadius: stackElementRadius,
            stackElementHeight: stackElementHeight,
            stackElementSpacing: stackElementSpacing
        }
    };

    this.setTileForm(data.tileForm);
    this.setStackElementRadius(data.stackElementRadius);
    this.setStackElementHeight(data.stackElementHeight);
    this.setStackElementSpacing(data.stackElementSpacing);
}