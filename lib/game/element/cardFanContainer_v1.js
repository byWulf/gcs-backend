'use strict';

module.exports = CardFanContainer;

function CardFanContainer(data) {
    let inverted = false;

    this.setInverted = function(newInverted) {
        if (typeof newInverted === 'undefined') throw new Error('CardFanContainer_v1 must define "inverted".');
        if (typeof newInverted !== 'boolean') throw new Error('CardStackContainer_v1.inverted must be a boolean.');

        inverted = newInverted;
    };

    this.transformToFrontend = function(playerIndex) {
        return {
            inverted: inverted
        };
    };

    this.setInverted(data.inverted);
}