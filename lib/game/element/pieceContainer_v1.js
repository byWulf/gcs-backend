'use strict';

module.exports = PieceContainer;

function PieceContainer(data) {
    let positions = [];
    let stackElementRadius = 1;

    this.setPositions = function(newPositions) {
        positions = newPositions;
    };

    this.setStackElementRadius = function(value) {
        stackElementRadius = value;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            positions: positions,
            stackElementRadius: stackElementRadius
        }
    };

    this.setPositions(data.positions);
    this.setStackElementRadius(data.stackElementRadius);
}