'use strict';

module.exports = Piece;

function Piece(data) {
    let width = null;
    let height = null;
    let depth = null;
    let model = '';

    this.setWidth = function(input) {
        width = input;
    };

    this.setHeight = function(input) {
        height = input;
    };

    this.setDepth = function(input) {
        depth = input;
    };

    this.setModel = function(newModel) {
        if (typeof newModel === 'undefined') throw new Error('Piece_v1 must define "model".');
        if (typeof newModel !== 'string') throw new Error('Piece_v1.model must be a string.');
        if (newModel === '') throw new Error('Piece_v1.model must be filled.');

        model = newModel;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            width: width,
            height: height,
            depth: depth,
            model: model
        };
    };
    
    this.setWidth(data.width);
    this.setHeight(data.height);
    this.setDepth(data.depth);
    this.setModel(data.model);
}