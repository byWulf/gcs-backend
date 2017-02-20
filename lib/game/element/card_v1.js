'use strict';

module.exports = Card;

function Card(data) {
    let order = 0;
    let frontImage = '';
    let backImage = '';
    let side = 'back';
    let rotation = 0;
    let frontVisibleFor = [];
    let clickableFor = [];
    let canBeAttachedTo = [];
    
    this.setOrder = function(newOrder) {
        if (typeof newOrder === 'undefined') throw new Error('Card_v1 must define "order".');
        if (typeof newOrder !== 'number') throw new Error('Card_v1.order must be a number.');

        if (parseInt(newOrder, 10) !== newOrder) throw new Error('Card_v1.order must be an integer.');

        order = newOrder;
    };
    
    this.setFrontImage = function(newFrontImage) {
        if (typeof newFrontImage === 'undefined') throw new Error('Card_v1 must define "frontImage".');
        if (typeof newFrontImage !== 'string') throw new Error('Card_v1.frontImage must be a string.');
        if (newFrontImage === '') throw new Error('Card_v1.frontImage must be filled.');

        frontImage = newFrontImage;
    };
    
    this.setBackImage = function(newBackImage) {
        if (typeof newBackImage === 'undefined') throw new Error('Card_v1 must define "backImage".');
        if (typeof newBackImage !== 'string') throw new Error('Card_v1.backImage must be a string.');
        if (newBackImage === '') throw new Error('Card_v1.backImage must be filled.');

        backImage = newBackImage;
    };
    
    this.setSide = function(newSide) {
        if (typeof newSide === 'undefined') throw new Error('Card_v1 must define "side".');
        if (['front', 'back'].indexOf(newSide) === -1) throw new Error('Card_v1.side must be one of: front, back.');
        side = newSide;
    };
    
    this.setRotation = function(newRotation) {
        if (typeof newRotation === 'undefined') throw new Error('Card_v1 must define "rotation".');
        if (typeof newRotation !== 'number') throw new Error('Card_v1.rotation must be a number.');

        if (newRotation < 0 || newRotation >= 360) throw new Error('Card_v1.rotation must be greater equal than 0 and less than 360.');
        
        rotation = newRotation;
    };
    
    this.setFrontVisibleFor = function(newFrontVisibleFor) {
        if (typeof newFrontVisibleFor === 'undefined') throw new Error('Card_v1 must define "frontVisibleFor".');
        if (!(newFrontVisibleFor instanceof Array)) throw new Error('Card_v1.frontVisibleFor must be an array.');

        for (let i = 0; i < newFrontVisibleFor.length; i++) {
            if (typeof newFrontVisibleFor[i] !== 'number' || parseInt(newFrontVisibleFor[i], 10) !== newFrontVisibleFor[i]) throw new Error('Card_v1.frontVisibleFor must consist of integer elements.');
            if (newFrontVisibleFor[i] < 0) throw new Error('Card_v1.frontVisibleFor must consist of positive elements.');

            for (let j = 0; j < newFrontVisibleFor.length; j++) {
                if (j !== i && newFrontVisibleFor[j] === newFrontVisibleFor[i]) throw new Error('Card_v1.frontVisibleFor must consist of unique elements.');
            }
        }
        
        frontVisibleFor = newFrontVisibleFor;
    };
    
    this.setClickableFor = function(newClickableFor) {
        if (typeof newClickableFor === 'undefined') throw new Error('Card_v1 must define "clickableFor".');
        if (!(newClickableFor instanceof Array)) throw new Error('Card_v1.clickableFor must be an array.');

        for (let i = 0; i < newClickableFor.length; i++) {
            if (typeof newClickableFor[i] !== 'number' || parseInt(newClickableFor[i], 10) !== newClickableFor[i]) throw new Error('Card_v1.clickableFor must consist of integer elements.');
            if (newClickableFor[i] < 0) throw new Error('Card_v1.clickableFor must consist of positive elements.');

            for (let j = 0; j < newClickableFor.length; j++) {
                if (j !== i && newClickableFor[j] === newClickableFor[i]) throw new Error('Card_v1.clickableFor must consist of unique elements.');
            }
        }
        
        clickableFor = newClickableFor;
    };
    
    this.setCanBeAttachedTo = function(newCanBeAttachedTo) {
        if (typeof newCanBeAttachedTo === 'undefined') throw new Error('Card_v1 must define "canBeAttachedTo".');
        if (!(newCanBeAttachedTo instanceof Array)) throw new Error('Card_v1.canBeAttachedTo must be an array.');

        if (newCanBeAttachedTo.length > 10000) throw new Error('Card_v1.canBeAttachedTo must contain at most 10000 items.');

        for (let i = 0; i < newCanBeAttachedTo.length; i++) {
            if (typeof newCanBeAttachedTo[i].containerId === 'undefined') throw new Error('Card_v1.canBeAttachedTo[*] must define "containerId".');
            if (typeof newCanBeAttachedTo[i].containerId !== 'string') throw new Error('Card_v1.canBeAttachedTo[*].containerId must be a string.');
            if (newCanBeAttachedTo[i].containerId === '') throw new Error('Card_v1.canBeAttachedTo[*].containerId must be filled.');

            if (typeof newCanBeAttachedTo[i].order === 'undefined') throw new Error('Card_v1.canBeAttachedTo[*] must define "order".');
            if (typeof newCanBeAttachedTo[i].order !== 'number') throw new Error('Card_v1.canBeAttachedTo[*].order must be a number.');
            if (parseInt(newCanBeAttachedTo[i].order, 10) !== newCanBeAttachedTo[i].order) throw new Error('Card_v1.canBeAttachedTo[*].order must be an integer.');
            
            if (typeof newCanBeAttachedTo[i].byPlayers === 'undefined') throw new Error('Card_v1.canBeAttachedTo[*] must define "byPlayers".');
            if (!(newCanBeAttachedTo[i].byPlayers instanceof Array)) throw new Error('Card_v1.canBeAttachedTo[*].byPlayers must be an array.');
            if (newCanBeAttachedTo[i].byPlayers.length === 0) throw new Error('Card_v1.canBeAttachedTo[*].byPlayers must have at least one item.');

            for (let j = 0; j < newCanBeAttachedTo[i].byPlayers.length; j++) {
                if (typeof newCanBeAttachedTo[i].byPlayers[j] !== 'number' || parseInt(newCanBeAttachedTo[i].byPlayers[j], 10) !== newCanBeAttachedTo[i].byPlayers[j]) throw new Error('Card_v1.canBeAttachedTo[*].byPlayers must consist of integer elements.');
                if (newCanBeAttachedTo[i].byPlayers[j] < 0) throw new Error('Card_v1.canBeAttachedTo[*].byPlayers must consist of positive elements.');
    
                for (let k = 0; k < newCanBeAttachedTo[i].byPlayers.length; k++) {
                    if (k !== j && newCanBeAttachedTo[i].byPlayers[k] === newCanBeAttachedTo[i].byPlayers[j]) throw new Error('Card_v1.canBeAttachedTo[*].byPlayers must consist of unique elements.');
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
                    order: canBeAttachedTo[i].order
                });
            }
        }

        return {
            order: order,
            frontImage: frontVisibleFor.indexOf(playerIndex) > -1 ? frontImage : null,
            backImage: backImage,
            side: side,
            rotation: rotation,
            clickable: clickableFor.indexOf(playerIndex) > -1,
            canBeAttachedTo: canBeAttachedToList
        };
    };

    this.onEvent = function(event, data) {
        if (event === 'card.orderChanged') {

        }

        if (event === 'card.permissionsChanged') {

        }

        if (event === 'card.rotationChanged') {

        }

        if (event === 'card.sideChanged') {

        }
    };
    
    this.setOrder(data.order);
    this.setFrontImage(data.frontImage);
    this.setBackImage(data.backImage);
    this.setSide(data.side);
    this.setRotation(data.rotation);
    this.setFrontVisibleFor(data.frontVisibleFor);
    this.setClickableFor(data.clickableFor);
    this.setCanBeAttachedTo(data.canBeAttachedTo);
}