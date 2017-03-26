'use strict';

module.exports = TileContainer;

function TileContainer(data) {
    let x = 0;
    let y = 0;
    let z = 0;

    let tileForm = 'square'; //square, hexagonal, triangular
    let stackElementRadius = 5;

    this.setX = function(value) {
        x = value;
    };

    this.setY = function(value) {
        y = value;
    };

    this.setZ = function(value) {
        z = value;
    };

    this.setTileForm = function(value) {
        tileForm = value;
    };

    this.setStackElementRadius = function(value) {
        stackElementRadius = value;
    };

    this.transformToFrontend = function(slotIndex) {
        return {
            x: x,
            y: y,
            z: z,
            tileForm: tileForm,
            stackElementRadius: stackElementRadius
        }
    };

    this.setX(data.x);
    this.setY(data.y);
    this.setZ(data.z);
    this.setTileForm(data.tileForm);
    this.setStackElementRadius(data.stackElementRadius);
}