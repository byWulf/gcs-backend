'use strict';

const MethodError = require('../../error/methodError');

module.exports = Tile;

function Tile(data) {
    let frontImage = '';
    let backImage = '';

    let side = 'back'; //front, back
    let rotation = 0; //in degree, clockwise
    let height = 0.2;
    let radius = 5; //border to border
    let form = 'square'; //square, hexagonal

    let frontVisibleFor = null; //null for all, othervise array of allowed slotIndizes, empty array for no one
    let canBeMovedBy = [];
    let canBeRotatedBy = [];
    let canBeFlippedBy = [];

    this.setFrontImage = function(newFrontImage) {
        if (typeof newFrontImage === 'undefined') throw new Error('Tile_v1 must define "frontImage".');
        if (typeof newFrontImage !== 'string') throw new Error('Tile_v1.frontImage must be a string.');
        if (newFrontImage === '') throw new Error('Tile_v1.frontImage must be filled.');

        frontImage = newFrontImage
    };

    this.setBackImage = function(newBackImage) {
        if (typeof newBackImage === 'undefined') throw new Error('Tile_v1 must define "backImage".');
        if (typeof newBackImage !== 'string') throw new Error('Tile_v1.backImage must be a string.');
        if (newBackImage === '') throw new Error('Tile_v1.backImage must be filled.');

        backImage = newBackImage
    };

    this.setSide = function(newSide) {
        side = newSide;
    };

    this.setRotation = function(newRotation) {
        rotation = newRotation;
    };

    this.setHeight = function(newHeight) {
        height = newHeight;
    };

    this.setRadius = function(newRadius) {
        radius = newRadius
    };

    this.setForm = function(newForm) {
        form = newForm;
    };

    this.setFrontVisibleFor = function(newFrontVisibleFor) {
        frontVisibleFor = newFrontVisibleFor;
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
            height: height,
            radius: radius,
            form: form,
            canBeMovedTo: this.getCanBeMovedTo(slotIndex),
            canBeRotatedTo: this.getCanBeRotatedTo(slotIndex),
            canBeFlipped: canBeFlippedBy.indexOf(slotIndex) > -1
        };
    };

    this.getCanBeMovedTo = function(slotIndex) {
        let moveTargets = [];

        for (let i = 0; i < canBeMovedBy.length; i++) {
            if (canBeMovedBy[i].slotIndex === slotIndex) {
                moveTargets.push({target: canBeMovedBy[i].target, rotations: canBeMovedBy[i].rotations});
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
        if (event === 'tile.sideChanged') {
            side = data.side;

            return {
                side: side
            };
        }

        if (event === 'tile.rotationChanged') {
            rotation = data.rotation;

            return {
                rotation: rotation
            };
        }

        if (event === 'tile.permissionChanged') {
            frontVisibleFor = data.frontVisibleFor;
            canBeMovedBy = data.canBeMovedBy;
            canBeRotatedBy = data.canBeRotatedBy;
            canBeFlippedBy = data.canBeFlippedBy;

            return (slotIndex) => {
                return {
                    frontImage: frontVisibleFor === null || frontVisibleFor.indexOf(slotIndex) > -1 ? frontImage : null,
                    canBeMovedTo: this.getCanBeMovedTo(slotIndex),
                    canBeRotatedTo: this.getCanBeRotatedTo(slotIndex),
                    canBeFlipped: canBeFlippedBy.indexOf(slotIndex) > -1
                };
            };
        }

        return null;
    };

    this.onMethod = function(method, data, slotIndex) {
        if (method === 'tile.flip') {
            if (canBeFlippedBy.indexOf(slotIndex) === -1) {
                throw new MethodError('tile.notAllowedToFlip');
            }

            return {};
        }

        if (method === 'tile.rotate') {
            let found = false;
            for (let rotationArray of canBeRotatedBy) {
                if (rotationArray.slotIndex === slotIndex && rotationArray.rotation === data.rotation) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                throw new MethodError('tile.notAllowedToRotate');
            }

            return {
                rotation: data.rotation
            };
        }

        if (method === 'tile.move') {
            let validMove = false;
            for (let i = 0; i < canBeMovedBy.length; i++) {
                if (
                    canBeMovedBy[i].slotIndex === slotIndex &&
                    canBeMovedBy[i].target.id === data.containerId &&
                    canBeMovedBy[i].target.data.x === data.x &&
                    canBeMovedBy[i].target.data.y === data.y &&
                    canBeMovedBy[i].rotations.indexOf(rotation) > -1
                ) {
                    validMove = true;
                    break;
                }
            }
            if (!validMove) {
                throw new MethodError('tile.notAllowedToMove');
            }

            return {
                containerId: data.containerId,
                x: data.x,
                y: data.y,
                index: data.index
            };
        }

        throw new MethodError('method.notFound');
    };

    this.setFrontImage(data.frontImage);
    this.setBackImage(data.backImage);
    this.setSide(data.side);
    this.setRotation(data.rotation);
    this.setHeight(data.height);
    this.setRadius(data.radius);
    this.setForm(data.form);
    this.setFrontVisibleFor(data.frontVisibleFor);
    this.setCanBeMovedBy(data.canBeMovedBy);
    this.setCanBeRotatedBy(data.canBeRotatedBy);
    this.setCanBeFlippedBy(data.canBeFlippedBy);
}