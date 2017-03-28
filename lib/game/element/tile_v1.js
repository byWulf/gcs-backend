'use strict';

module.exports = Tile;

function Tile(data) {
    let frontImage = '';
    let backImage = '';
    
    let side = 'back'; //front, back
    let rotation = 0;
    let height = 0.2;
    let width = 5;
    let form = 'square'; //square, hexagonal, triangular
    
    let frontVisibleFor = [];
    let canBeMovedBy = [];
    let canBeRotated = true;
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

    this.setWidth = function(newWidth) {
        width = newWidth
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

    this.setCanBeRotated = function(newCanBeRotated) {
        canBeRotated = newCanBeRotated;
    };

    this.setCanBeFlippedBy = function(newCanBeFlippedBy) {
        canBeFlippedBy = newCanBeFlippedBy;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            frontImage: frontVisibleFor.indexOf(slotIndex) > -1 ? frontImage : null,
            backImage: backImage,
            side: side,
            rotation: rotation,
            height: height,
            width: width,
            form: form,
            canBeMovedTo: this.getCanBeMovedTo(slotIndex),
            canBeRotated: canBeRotated,
            canBeFlipped: canBeFlippedBy.indexOf(slotIndex) > -1
        };
    };

    this.getCanBeMovedTo = function(slotIndex) {
        let moveTargets = [];

        for (let i = 0; i < canBeMovedBy.length; i++) {
            if (canBeMovedBy[i].slotIndex === slotIndex) {
                moveTargets.push(canBeMovedBy[i].target);
            }
        }

        return moveTargets;
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
            canBeFlippedBy = data.canBeFlippedBy;

            return (slotIndex) => {
                return {
                    frontImage: frontVisibleFor.indexOf(slotIndex) > -1 ? frontImage : null,
                    canBeMovedTo: this.getCanBeMovedTo(slotIndex),
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
            if (!canBeRotated) {
                throw new MethodError('tile.notAllowedToRotate');
            }

            return {
                rotation: data.rotation
            };
        }

        if (method === 'tile.move') {
            let validMove = false;
            for (let i = 0; i < canBeMovedBy.length; i++) {
                if (canBeMovedBy[i].slotIndex === slotIndex && canBeMovedBy[i].target.id === data.containerId && canBeMovedBy[i].target.data.x === data.x && canBeMovedBy[i].target.data.y === data.y) {
                    validMove = true;
                    break;
                }
            }
            if (!validMove) {
                throw new MethodError('tile.notAllowedToMove');
            }

            return {
                containerId: data.containerId,
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
    this.setWidth(data.width);
    this.setForm(data.form);
    this.setFrontVisibleFor(data.frontVisibleFor);
    this.setCanBeMovedBy(data.canBeMovedBy);
    this.setCanBeRotated(data.canBeRotated);
    this.setCanBeFlippedBy(data.canBeFlippedBy);
}