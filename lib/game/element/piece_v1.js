'use strict';

module.exports = Piece;

function Piece(data) {
    let model = '';
    let color = '#ffffff';
    let canBeMovedBy = [];

    this.setModel = function(newModel) {
        if (typeof newModel === 'undefined') throw new Error('Piece_v1 must define "model".');
        if (typeof newModel !== 'string') throw new Error('Piece_v1.model must be a string.');
        if (newModel === '') throw new Error('Piece_v1.model must be filled.');

        model = newModel;
    };

    this.setColor = function(newColor) {
        color = newColor;
    };

    this.setCanBeMovedBy = function(newCanBeMovedBy) {
        canBeMovedBy = newCanBeMovedBy;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            model: model,
            color: color,
            canBeMovedTo: this.getCanBeMovedTo(slotIndex)
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
        if (event === 'piece.permissionChanged') {
            canBeMovedBy = data.canBeMovedBy;

            return (slotIndex) => {
                return {
                    canBeMovedTo: this.getCanBeMovedTo(slotIndex)
                };
            };
        }

        return null;
    };

    this.onMethod = function(method, data, slotIndex) {
        if (method === 'piece.move') {
            let validMove = false;
            for (let i = 0; i < canBeMovedBy.length; i++) {
                if (canBeMovedBy[i].slotIndex === slotIndex && canBeMovedBy[i].target.id === data.containerId && canBeMovedBy[i].target.data.index === data.index) {
                    validMove = true;
                    break;
                }
            }
            if (!validMove) {
                throw new MethodError('piece.notAllowedToMove');
            }

            return {
                containerId: data.containerId,
                index: data.index
            };
        }

        throw new MethodError('method.notFound');
    };

    this.setModel(data.model);
    this.setColor(data.color);
    this.setCanBeMovedBy(data.canBeMovedBy);
}