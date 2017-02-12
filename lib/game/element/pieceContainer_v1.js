'use strict';

module.exports = PieceContainer;

function PieceContainer(data) {
    let positions = [];

    this.setPositions = function(newPositions) {
        if (typeof newPositions === 'undefined') throw new Error('PieceContainer_v1 must define "positions".');
        if (!(newPositions instanceof Array)) throw new Error('PieceContainer_v1.positions must be an array.');

        if (newPositions.length === 0) throw new Error('PieceContainer_v1.positions must have at least one position.');
        if (newPositions.length > 10000) throw new Error('PieceContainer_v1.positions must have at most 10000 positions.');

        for (let i = 0; i < newPositions.length; i++) {
            if (typeof newPositions[i] !== 'object') throw new Error('pieceContainer_v1.positions[' + i + '] must be an assoc array.');
            
            if (typeof newPositions[i].x === 'undefined') throw new Error('pieceContainer_v1.positions[' + i + '] must define "x".');
            if (typeof newPositions[i].x !== 'number') throw new Error('pieceContainer_v1.positions[' + i + '].x must be a number');
            if (newPositions[i].x < -1 || newPositions[i].x > 1) throw new Error('pieceContainer_v1.positions[' + i + '].x must be between -1 and 1.');
            
            if (typeof newPositions[i].y === 'undefined') throw new Error('pieceContainer_v1.positions[' + i + '] must define "y".');
            if (typeof newPositions[i].y !== 'number') throw new Error('pieceContainer_v1.positions[' + i + '].y must be a number');
            if (newPositions[i].y < -1 || newPositions[i].y > 1) throw new Error('pieceContainer_v1.positions[' + i + '].y must be between -1 and 1.');
        }

        positions = newPositions;
    };

    this.transformToFrontend = function(playerIndex) {
        return {
            positions: positions
        }
    };

    this.setPositions(data.positions);
}