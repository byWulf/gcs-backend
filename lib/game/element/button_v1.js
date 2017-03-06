'use strict';

module.exports = Button;

function Button(data) {
    let label = '';
    let size = 1;
    let x = 0;
    let y = 0;
    let clickableFor = [];
    let visibleFor = [];
    
    this.setLabel = function(newLabel) {
        if (typeof newLabel === 'undefined') throw new Error('Button_v1 must define "label".');
        if (typeof newLabel !== 'string') throw new Error('Button_v1.label must be a string.');

        label = newLabel;
    };
    
    this.setSize = function(newSize) {
        if (typeof newSize === 'undefined') throw new Error('Button_v1 must define "size".');
        if (typeof newSize !== 'number' || newSize <= 0) throw new Error('Button_v1.size must be a positive number.');
        
        size = newSize;
    };
    
    this.setX = function(newX) {
        if (typeof newX === 'undefined') throw new Error('Button_v1 must define "x".');
        if (typeof newX !== 'number') throw new Error('Button_v1.x must be a number.');
        
        x = newX;
    };
    
    this.setY = function(newY) {
        if (typeof newY === 'undefined') throw new Error('Button_v1 must define "y".');
        if (typeof newY !== 'number') throw new Error('Button_v1.y must be a number.');
        
        y = newY;
    };
    
    this.setClickableFor = function(newClickableFor) {
        if (typeof newClickableFor === 'undefined') throw new Error('Button_v1 must define "clickableFor".');
        if (!(newClickableFor instanceof Array)) throw new Error('Button_v1.clickableFor must be an array.');

        for (let i = 0; i < newClickableFor.length; i++) {
            if (typeof newClickableFor[i] !== 'number' || parseInt(newClickableFor[i], 10) !== newClickableFor[i]) throw new Error('Button_v1.clickableFor must consist of integer elements.');
            if (newClickableFor[i] < 0) throw new Error('Button_v1.clickableFor must consist of positive elements.');

            for (let j = 0; j < newClickableFor.length; j++) {
                if (j !== i && newClickableFor[j] === newClickableFor[i]) throw new Error('Button_v1.clickableFor must consist of unique elements.');
            }
        }
        
        clickableFor = newClickableFor;
    };
    
    this.setVisibleFor = function(newVisibleFor) {
        if (typeof newVisibleFor === 'undefined') throw new Error('Button_v1 must define "visibleFor".');
        if (!(newVisibleFor instanceof Array)) throw new Error('Button_v1.visibleFor must be an array.');

        for (let i = 0; i < newVisibleFor.length; i++) {
            if (typeof newVisibleFor[i] !== 'number' || parseInt(newVisibleFor[i], 10) !== newVisibleFor[i]) throw new Error('Button_v1.visibleFor must consist of integer elements.');
            if (newVisibleFor[i] < 0) throw new Error('Button_v1.visibleFor must consist of positive elements.');

            for (let j = 0; j < newVisibleFor.length; j++) {
                if (j !== i && newVisibleFor[j] === newVisibleFor[i]) throw new Error('Button_v1.visibleFor must consist of unique elements.');
            }
        }
        
        visibleFor = newVisibleFor;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            label: label,
            size: size,
            x: x,
            y: y,
            clickable: clickableFor.indexOf(slotIndex) > -1,
            visible: visibleFor.indexOf(slotIndex) > -1
        };
    };

    this.onEvent = function(event, data) {
        if (event === 'button.permissionChanged') {
            //TODO
        }
    };
    
    this.setLabel(data.label);
    this.setSize(data.size);
    this.setX(data.x);
    this.setY(data.y);
    this.setClickableFor(data.clickableFor);
    this.setVisibleFor(data.visibleFor);
}