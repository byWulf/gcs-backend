'use strict';

module.exports = Object;

function Object(data) {
    let image = '';
    let model = '';
    let size = 1;
    let x = 0;
    let y = 0;
    let rotation = 0;
    
    this.setImage = function(newImage) {
        if (typeof newImage === 'undefined') throw new Error('Object_v1 must define "image".');
        if (typeof newImage !== 'string') throw new Error('Object_v1.image must be a string.');
        if (newImage === '') throw new Error('Object_v1.image must be filled.');

        image = newImage;
    };
    
    this.setModel = function(newModel) {
        if (typeof newModel === 'undefined') throw new Error('Object_v1 must define "model".');
        if (typeof newModel !== 'string') throw new Error('Object_v1.model must be a string.');
        if (newModel === '') throw new Error('Object_v1.model must be filled.');

        model = newModel;
    };
    
    this.setSize = function(newSize) {
        if (typeof newSize === 'undefined') throw new Error('Object_v1 must define "size".');
        if (typeof newSize !== 'number' || newSize <= 0) throw new Error('Object_v1.size must be a positive number.');
        
        size = newSize;
    };
    
    this.setX = function(newX) {
        if (typeof newX === 'undefined') throw new Error('Object_v1 must define "x".');
        if (typeof newX !== 'number') throw new Error('Object_v1.x must be a number.');
        
        x = newX;
    };
    
    this.setY = function(newY) {
        if (typeof newY === 'undefined') throw new Error('Object_v1 must define "y".');
        if (typeof newY !== 'number') throw new Error('Object_v1.y must be a number.');
        
        y = newY;
    };

    this.setRotation = function(newRotation) {
        if (typeof newRotation === 'undefined') throw new Error('Object_v1 must define "rotation".');
        if (typeof newRotation !== 'number') throw new Error('Object_v1.rotation must be a number.');

        if (newRotation < 0 || newRotation >= 360) throw new Error('Object_v1.rotation must be greater equal than 0 and less than 360.');

        rotation = newRotation;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            image: image,
            model: model,
            size: size,
            x: x,
            y: y,
            rotation: rotation
        };
    };

    this.onEvent = function(event, data) {
        if (event === 'object.positionChanged') {

        }
    };
    
    this.setImage(data.image);
    this.setModel(data.model);
    this.setSize(data.size);
    this.setX(data.x);
    this.setY(data.y);
    this.setRotation(data.rotation);
}