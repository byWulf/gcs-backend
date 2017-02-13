'use strict';

module.exports = Piece;

function Piece(data) {
    let image = '';
    let model = '';
    let clickableFor = [];
    let canBeAttachedTo = [];
    
    this.setImage = function(newImage) {
        if (typeof newImage === 'undefined') throw new Error('Piece_v1 must define "image".');
        if (typeof newImage !== 'string') throw new Error('Piece_v1.image must be a string.');
        if (newImage === '') throw new Error('Piece_v1.image must be filled.');

        image = newImage;
    };
    
    this.setModel = function(newModel) {
        if (typeof newModel === 'undefined') throw new Error('Piece_v1 must define "model".');
        if (typeof newModel !== 'string') throw new Error('Piece_v1.model must be a string.');
        if (newModel === '') throw new Error('Piece_v1.model must be filled.');

        model = newModel;
    };
    
    this.setClickableFor = function(newClickableFor) {
        if (typeof newClickableFor === 'undefined') throw new Error('Piece_v1 must define "clickableFor".');
        if (!(newClickableFor instanceof Array)) throw new Error('Piece_v1.clickableFor must be an array.');

        for (let i = 0; i < newClickableFor.length; i++) {
            if (typeof newClickableFor[i] !== 'number' || parseInt(newClickableFor[i], 10) !== newClickableFor[i]) throw new Error('Piece_v1.clickableFor must consist of integer elements.');
            if (newClickableFor[i] < 0) throw new Error('Piece_v1.clickableFor must consist of positive elements.');

            for (let j = 0; j < newClickableFor.length; j++) {
                if (j !== i && newClickableFor[j] === newClickableFor[i]) throw new Error('Piece_v1.clickableFor must consist of unique elements.');
            }
        }
        
        clickableFor = newClickableFor;
    };
    
    this.setCanBeAttachedTo = function(newCanBeAttachedTo) {
        if (typeof newCanBeAttachedTo === 'undefined') throw new Error('Piece_v1 must define "canBeAttachedTo".');
        if (!(newCanBeAttachedTo instanceof Array)) throw new Error('Piece_v1.canBeAttachedTo must be an array.');

        if (newCanBeAttachedTo.length > 10000) throw new Error('Piece_v1.canBeAttachedTo must contain at most 10000 items.');

        for (let i = 0; i < newCanBeAttachedTo.length; i++) {
            if (typeof newCanBeAttachedTo[i].containerId === 'undefined') throw new Error('Piece_v1.canBeAttachedTo[*] must define "containerId".');
            if (typeof newCanBeAttachedTo[i].containerId !== 'string') throw new Error('Piece_v1.canBeAttachedTo[*].containerId must be a string.');
            if (newCanBeAttachedTo[i].containerId === '') throw new Error('Piece_v1.canBeAttachedTo[*].containerId must be filled.');

            if (typeof newCanBeAttachedTo[i].index === 'undefined') throw new Error('Piece_v1.canBeAttachedTo[*] must define "index".');
            if (typeof newCanBeAttachedTo[i].index !== 'number') throw new Error('Piece_v1.canBeAttachedTo[*].index must be a number.');
            if (parseInt(newCanBeAttachedTo[i].index, 10) !== newCanBeAttachedTo[i].index || newCanBeAttachedTo[i].index < 0) throw new Error('Piece_v1.canBeAttachedTo[*].index must be a positive integer.');
            
            if (typeof newCanBeAttachedTo[i].byPlayers === 'undefined') throw new Error('Piece_v1.canBeAttachedTo[*] must define "byPlayers".');
            if (!(newCanBeAttachedTo[i].byPlayers instanceof Array)) throw new Error('Piece_v1.canBeAttachedTo[*].byPlayers must be an array.');
            if (newCanBeAttachedTo[i].byPlayers.length === 0) throw new Error('Piece_v1.canBeAttachedTo[*].byPlayers must have at least one item.');

            for (let j = 0; j < newCanBeAttachedTo[i].byPlayers.length; j++) {
                if (typeof newCanBeAttachedTo[i].byPlayers[j] !== 'number' || parseInt(newCanBeAttachedTo[i].byPlayers[j], 10) !== newCanBeAttachedTo[i].byPlayers[j]) throw new Error('Piece_v1.canBeAttachedTo[*].byPlayers must consist of integer elements.');
                if (newCanBeAttachedTo[i].byPlayers[j] < 0) throw new Error('Piece_v1.canBeAttachedTo[*].byPlayers must consist of positive elements.');
    
                for (let k = 0; k < newCanBeAttachedTo[i].byPlayers.length; k++) {
                    if (k !== j && newCanBeAttachedTo[i].byPlayers[k] === newCanBeAttachedTo[i].byPlayers[j]) throw new Error('Piece_v1.canBeAttachedTo[*].byPlayers must consist of unique elements.');
                }
            }
        }

        canBeAttachedTo = newCanBeAttachedTo;
    };

    this.transformToFrontend = function(playerIndex) {
        let canBeAttachedToList = [];
        for (let i = 0; i < canBeAttachedTo.length; i++) {
            if (canBeAttachedTo[i].byPlayers.indexOf(playerIndex) > -1) {
                canBeAttachedToList.push({
                    containerId: canBeAttachedTo[i].containerId,
                    index: canBeAttachedTo[i].index
                });
            }
        }

        return {
            image: image,
            model: model,
            clickable: clickableFor.indexOf(playerIndex) > -1,
            canBeAttachedTo: canBeAttachedToList
        };
    };
    
    this.setImage(data.image);
    this.setModel(data.model);
    this.setClickableFor(data.clickableFor);
    this.setCanBeAttachedTo(data.canBeAttachedTo);
}