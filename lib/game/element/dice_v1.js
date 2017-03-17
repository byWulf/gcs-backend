'use strict';

module.exports = Dice;

function Dice(data) {
    let value = 6;

    this.transformToFrontend = function(slotIndex) {
        return {
            value: value
        };
    };

    this.onEvent = function(event, data) {
        if (event === 'dice.rolled') {
            value = data.value;

            return {
                value: value
            };
        }

        return null;
    };
}