'use strict';

module.exports = AutoResizeContainer;

function AutoResizeContainer(data) {
    let spacing = 5;

    this.setSpacing = function(value) {
        spacing = value;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            spacing: spacing
        }
    };

    this.setSpacing(data.spacing);
}