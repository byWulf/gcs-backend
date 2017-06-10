'use strict';

const MethodError = require('../../error/methodError');

module.exports = Card;

function Card(data) {
    let frontImage = '';
    let backImage = '';

    let side = 'back'; //front, back
    let rotation = 0; //in degree, clockwise
    let width = 5;
    let height = 8;
    let depth = 0.05;
    let cornerRadius = 1;

    let frontVisibleFor = null; //null for all, othervise array of allowed slotIndizes, empty array for no one
    let canBeSelectedBy = [];
    let canBeMovedBy = [];
    let canBeRotatedBy = [];
    let canBeFlippedBy = [];

    this.setFrontImage = function(newFrontImage) {
        if (typeof newFrontImage === 'undefined') throw new Error('Card_v1 must define "frontImage".');
        if (typeof newFrontImage !== 'string') throw new Error('Card_v1.frontImage must be a string.');
        if (newFrontImage === '') throw new Error('Card_v1.frontImage must be filled.');

        frontImage = newFrontImage
    };

    this.setBackImage = function(newBackImage) {
        if (typeof newBackImage === 'undefined') throw new Error('Card_v1 must define "backImage".');
        if (typeof newBackImage !== 'string') throw new Error('Card_v1.backImage must be a string.');
        if (newBackImage === '') throw new Error('Card_v1.backImage must be filled.');

        backImage = newBackImage
    };

    this.setSide = function(newSide) {
        side = newSide;
    };

    this.setRotation = function(newRotation) {
        rotation = newRotation;
    };

    this.setWidth = function(newWidth) {
        width = newWidth;
    };

    this.setHeight = function(newHeight) {
        height = newHeight;
    };

    this.setDepth = function(newDepth) {
        depth = newDepth;
    };

    this.setCornerRadius = function(newCornerRadius) {
        cornerRadius = newCornerRadius
    };

    this.setFrontVisibleFor = function(newFrontVisibleFor) {
        frontVisibleFor = newFrontVisibleFor;
    };

    this.setCanBeSelectedBy = function(newCanBeSelectedBy) {
        canBeSelectedBy = newCanBeSelectedBy;
    };

    this.setCanBeMovedBy = function(newCanBeMovedBy) {
        canBeMovedBy = newCanBeMovedBy;
    };

    this.setCanBeRotatedBy = function(newCanBeRotatedBy) {
        canBeRotatedBy = newCanBeRotatedBy;
    };

    this.setCanBeFlippedBy = function(newCanBeFlippedBy) {
        canBeFlippedBy = newCanBeFlippedBy;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            frontImage: frontVisibleFor === null || frontVisibleFor.indexOf(slotIndex) > -1 ? frontImage : null,
            backImage: backImage,
            side: side,
            rotation: rotation,
            width: width,
            height: height,
            depth: depth,
            cornerRadius: cornerRadius,
            canBeSelected: canBeSelectedBy.indexOf(slotIndex) > -1,
            canBeMovedTo: this.getCanBeMovedTo(slotIndex),
            canBeRotatedTo: this.getCanBeRotatedTo(slotIndex),
            canBeFlipped: canBeFlippedBy.indexOf(slotIndex) > -1
        };
    };

    this.getCanBeMovedTo = function(slotIndex) {
        let moveTargets = [];

        for (let i = 0; i < canBeMovedBy.length; i++) {
            if (canBeMovedBy[i].slotIndex === slotIndex) {
                moveTargets.push({target: canBeMovedBy[i].target});
            }
        }

        return moveTargets;
    };

    this.getCanBeRotatedTo = function(slotIndex) {
        let possibleRotations = [];

        for (let i = 0; i < canBeRotatedBy.length; i++) {
            if (canBeRotatedBy[i].slotIndex === slotIndex) {
                possibleRotations.push(canBeRotatedBy[i].rotation);
            }
        }

        return possibleRotations;
    };

    this.onEvent = function(event, data) {
        if (event === 'card.sideChanged') {
            side = data.side;

            return {
                side: side
            };
        }

        if (event === 'card.rotationChanged') {
            rotation = data.rotation;

            return {
                rotation: rotation
            };
        }

        if (event === 'card.permissionChanged') {
            frontVisibleFor = data.frontVisibleFor;
            canBeSelectedBy = data.canBeSelectedBy;
            canBeMovedBy = data.canBeMovedBy;
            canBeRotatedBy = data.canBeRotatedBy;
            canBeFlippedBy = data.canBeFlippedBy;

            return (slotIndex) => {
                return {
                    frontImage: frontVisibleFor === null || frontVisibleFor.indexOf(slotIndex) > -1 ? frontImage : null,
                    canBeSelectedBy: canBeSelectedBy.indexOf(slotIndex) > 1,
                    canBeMovedTo: this.getCanBeMovedTo(slotIndex),
                    canBeRotatedTo: this.getCanBeRotatedTo(slotIndex),
                    canBeFlipped: canBeFlippedBy.indexOf(slotIndex) > -1
                };
            };
        }

        return null;
    };

    this.onMethod = function(method, data, slotIndex) {
        if (method === 'card.select') {
            if (canBeSelectedBy.indexOf(slotIndex) === -1) {
                throw new MethodError('card.notAllowedToSelect');
            }

            return {
                selected: data.selected
            };
        }
        if (method === 'card.flip') {
            if (canBeFlippedBy.indexOf(slotIndex) === -1) {
                throw new MethodError('card.notAllowedToFlip');
            }

            return {};
        }

        if (method === 'card.rotate') {
            let found = false;
            for (let rotationArray of canBeRotatedBy) {
                if (rotationArray.slotIndex === slotIndex && rotationArray.rotation === data.rotation) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                throw new MethodError('card.notAllowedToRotate');
            }

            return {
                rotation: data.rotation
            };
        }

        if (method === 'card.move') {
            let validMove = false;
            for (let i = 0; i < canBeMovedBy.length; i++) {
                if (
                    canBeMovedBy[i].slotIndex === slotIndex &&
                    canBeMovedBy[i].target.id === data.containerId &&
                    canBeMovedBy[i].target.data.position === data.position &&
                    canBeMovedBy[i].target.data.index === data.index
                ) {
                    validMove = true;
                    break;
                }
            }
            if (!validMove) {
                throw new MethodError('card.notAllowedToMove');
            }

            return {
                containerId: data.containerId,
                position: data.position,
                index: data.index
            };
        }

        throw new MethodError('method.notFound');
    };

    this.setFrontImage(data.frontImage);
    this.setBackImage(data.backImage);
    this.setSide(data.side);
    this.setRotation(data.rotation);
    this.setWidth(data.width);
    this.setHeight(data.height);
    this.setDepth(data.depth);
    this.setCornerRadius(data.cornerRadius);
    this.setFrontVisibleFor(data.frontVisibleFor);
    this.setCanBeSelectedBy(data.canBeSelectedBy);
    this.setCanBeMovedBy(data.canBeMovedBy);
    this.setCanBeRotatedBy(data.canBeRotatedBy);
    this.setCanBeFlippedBy(data.canBeFlippedBy);
}