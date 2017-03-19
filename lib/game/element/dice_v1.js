'use strict';

const MethodError = require('../../error/methodError');

module.exports = Dice;

function Dice(data) {
    let value = 6;
    let canBeRolledBy = [];

    this.transformToFrontend = function(slotIndex) {
        return {
            value: value,
            canBeRolled: canBeRolledBy.indexOf(slotIndex) > -1
        };
    };

    this.onEvent = function(event, data) {
        if (event === 'dice.rolled') {
            value = data.value;

            return {
                value: value
            };
        }

        if (event === 'dice.permissionChanged') {
            canBeRolledBy = data.canBeRolledBy;

            return (slotIndex) => {
                return {
                    canBeRolled: canBeRolledBy.indexOf(slotIndex) > -1
                };
            };
        }

        return null;
    };

    this.onMethod = function(method, data, slotIndex) {
        if (method === 'dice.roll') {
            if (canBeRolledBy.indexOf(slotIndex) === -1) {
                throw new MethodError('dice.notAllowedToRoll');
            }

            return {
                intensity: data.intensity
            };
        }

        throw new MethodError('method.notFound');
    };
}