'use strict';

const MethodError = require('../../error/methodError');

module.exports = Button;

function Button(data) {
    let label = '';
    let canBeClickedBy = [];

    this.setLabel = function(newLabel) {
        label = newLabel;
    };

    this.setCanBeClickedBy = function(newCanBeClickedBy) {
        canBeClickedBy = newCanBeClickedBy;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            label: label,
            canBeClicked: canBeClickedBy.indexOf(slotIndex) > -1
        };
    };

    this.onEvent = function(event, data) {
        if (event === 'button.permissionChanged') {
            canBeClickedBy = data.canBeClickedBy;

            return (slotIndex) => {
                return {
                    canBeClicked: canBeClickedBy.indexOf(slotIndex) > -1
                };
            };
        }

        return null;
    };

    this.onMethod = function(method, data, slotIndex) {
        if (method === 'button.click') {
            if (canBeClickedBy.indexOf(slotIndex) === -1) {
                throw new MethodError('button.notAllowedToClick');
            }

            return {};
        }

        throw new MethodError('method.notFound');
    };

    this.setLabel(data.label);
    this.setCanBeClickedBy(data.canBeClickedBy);
}