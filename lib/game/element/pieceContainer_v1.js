'use strict';

module.exports = PieceContainer;

function PieceContainer(data) {
    let positions = [];

    this.setPositions = function(newPositions) {
        positions = newPositions;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            positions: positions
        }
    };

    this.setPositions(data.positions);
}