'use strict';

module.exports = CardStackContainer;

function CardStackContainer(data) {
    let type = 'ordered';

    this.setType = function(newType) {
        if (typeof newType === 'undefined') throw new Error('CardStackContainer_v1 must define "type".');
        if (['ordered', 'messy', 'random'].indexOf(newType) === -1) throw new Error('CardStackContainer_v1.type must be one of: ordered, messy, random.');

        type = newType;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            type: type
        };
    };

    this.setType(data.type);
}