'use strict';

module.exports = MatrixContainer;

function MatrixContainer(data) {
    let tileForm = 'square';

    this.setTileForm = function(newTileForm) {
        if (typeof newTileForm === 'undefined') throw new Error('MatrixContainer_v1 must define "tileForm".');
        if (['square', 'hexagonal', 'triangular'].indexOf(newTileForm) === -1) throw new Error('MatrixContainer_v1.tileForm must be one of: square, hexagonal, triangular.');

        tileForm = newTileForm;
    };

    this.transformToFrontend = function(playerIndex) {
        return {
            tileForm: tileForm
        };
    };

    this.setTileForm(data.tileForm);
}