'use strict';

module.exports = Board;

function Board(data) {
    let image = null;

    this.setImage = function(newImage) {
        if (typeof newImage === 'undefined') throw new Error('Board_v1 must define "image".');
        if (typeof newImage !== 'string') throw new Error('Board_v1.image must be a string.');
        if (newImage === '') throw new Error('Board_v1.image must be filled.');

        image = newImage
    };

    this.transformToFrontend = function(playerIndex) {
        return {
            image: image
        };
    };

    this.setImage(data.image);
}