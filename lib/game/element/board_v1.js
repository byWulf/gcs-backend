'use strict';

module.exports = Board;

function Board(data) {
    let width = null;
    let height = null;
    let image = null;

    this.setWidth = function(input) {
        width = input;
    };

    this.setHeight = function(input) {
        height = input;
    };

    this.setImage = function(newImage) {
        if (typeof newImage === 'undefined') throw new Error('Board_v1 must define "image".');
        if (typeof newImage !== 'string') throw new Error('Board_v1.image must be a string.');
        if (newImage === '') throw new Error('Board_v1.image must be filled.');

        image = newImage
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            width: width,
            height: height,
            image: image
        };
    };

    this.setWidth(data.width);
    this.setHeight(data.height);
    this.setImage(data.image);
}