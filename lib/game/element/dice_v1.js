'use strict';

module.exports = Dice;

function Dice(data) {
    const formTypes = {
        coin: 2,
        tetrahedron: 4,
        cube: 6,
        octahedron: 8,
        'pentagonal trapezohedron': 10,
        dodecahedron: 12,
        icosahedron: 20
    };

    let form = 'coin';
    let sides = [
        'images/coinUp.png',
        'images/coinDown.png'
    ];
    let sideUp = 0;
    let canBeRolledBy = [];

    this.setForm = function(newForm) {
        if (typeof newForm === 'undefined') throw new Error('Dice_v1 must define "form".');
        if (typeof newForm !== 'string') throw new Error('Dice_v1.form must be a string.');

        if (typeof formTypes[newForm] === 'undefined') throw new Error('Dice_v1.form must be one of: coin, tetrahedron, cube, octahedron, pentagonal trapezohedron, dodecahedron, icosahedron.');

        form = newForm;
    };

    this.setSides = function(newSides) {
        if (typeof newSides === 'undefined') throw new Error('Dice_v1 must define "sides".');
        if (!(newSides instanceof Array)) throw new Error('Dice_v1.sides must be an array.');

        if (newSides.length !== formTypes[form]) throw new Error('Dice_v1.sides must consist of ' + formTypes[form] + ' elements for form ' + form + '.');
        for (let i = 0; i < newSides.length; i++) {
            if (typeof newSides[i] !== 'string') throw new Error('Dice_v1.sides must consist of string elements.');
        }

        sides = newSides;
    };

    this.setSideUp = function(newSideUp) {
        if (typeof newSideUp === 'undefined') throw new Error('Dice_v1 must define "sideUp".');
        if (typeof newSideUp !== 'number') throw new Error('Dice_v1.sideUp must be a number.');

        if (parseInt(newSideUp, 10) !== newSideUp) throw new Error('Dice_v1.sideUp must be an integer.');

        if (newSideUp < 0 || newSideUp >= formTypes[form]) throw new Error('Dice_v1.sideUp must be greater equal than 0 and less than ' + formTypes[form] + ' for form ' + form + '.');

        sideUp = newSideUp;
    };

    this.setCanBeRolledBy = function(newCanBeRolledBy) {
        if (typeof newCanBeRolledBy === 'undefined') throw new Error('Dice_v1 must define "canBeRolledBy".');
        if (!(newCanBeRolledBy instanceof Array)) throw new Error('Dice_v1.canBeRolledBy must be an array.');

        for (let i = 0; i < newCanBeRolledBy.length; i++) {
            if (typeof newCanBeRolledBy[i] !== 'number' || parseInt(newCanBeRolledBy[i], 10) !== newCanBeRolledBy[i]) throw new Error('Dice_v1.canBeRolledBy must consist of integer elements.');
            if (newCanBeRolledBy[i] < 0) throw new Error('Dice_v1.canBeRolledBy must consist of positive elements.');

            for (let j = 0; j < newCanBeRolledBy.length; j++) {
                if (j !== i && newCanBeRolledBy[j] === newCanBeRolledBy[i]) throw new Error('Dice_v1.canBeRolledBy must consist of unique elements.');
            }
        }

        canBeRolledBy = newCanBeRolledBy;
    };

    this.transformToFrontend = function(playerIndex) {
        return {
            form: form,
            sides: sides,
            sideUp: sideUp,
            canBeRolled: canBeRolledBy.indexOf(playerIndex) > -1
        }
    };

    this.onEvent = function(event, data) {
        if (event === 'dice.permissionsChanged') {

        }

        if (event === 'dice.rolled') {

        }
    };

    this.setForm(data.form);
    this.setSides(data.sides);
    this.setSideUp(data.sideUp);
    this.setCanBeRolledBy(data.canBeRolledBy);
}