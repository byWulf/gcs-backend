'use strict';

module.exports = Piece;

function Piece(data) {
    let model = '';
    let color = '#ffffff';

    this.setModel = function(newModel) {
        if (typeof newModel === 'undefined') throw new Error('Piece_v1 must define "model".');
        if (typeof newModel !== 'string') throw new Error('Piece_v1.model must be a string.');
        if (newModel === '') throw new Error('Piece_v1.model must be filled.');

        model = newModel;
    };

    this.setColor = function(newColor) {
        color = newColor;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            model: model,
            color: color
        };
    };

    this.setModel(data.model);
    this.setColor(data.color);
}