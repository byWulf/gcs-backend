'use strict';

const assert    = require('chai').assert;
const Button = require(__dirname + '/../../../lib/game/element/button_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('button_v1', function() {
            it('should instantiate without error', function() {
                let b = new Button({size: 1, x: 0, y: 0, label: 'Some action', clickableFor: [], visibleFor: []});
                assert.instanceOf(b, Button);
            });
            
            describe('size', function() {
                let b = new Button({size: 1, x: 0, y: 0, label: 'Some action', clickableFor: [], visibleFor: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        b.setSize();
                    });
                });
                it('should be a positive number', function () {
                    assert.throws(function() {
                        b.setSize(null);
                    });
                    assert.throws(function() {
                        b.setSize(false);
                    });
                    assert.throws(function() {
                        b.setSize(true);
                    });
                    assert.throws(function() {
                        b.setSize('foobar');
                    });
                    assert.doesNotThrow(function() {
                        b.setSize(1.23);
                    });
                    assert.throws(function() {
                        b.setSize([1,2,3]);
                    });
                    assert.throws(function() {
                        b.setSize({foo: 'bar'});
                    });
                    assert.throws(function() {
                        b.setSize(0);
                    });
                    assert.throws(function() {
                        b.setSize(-360);
                    });
                    assert.doesNotThrow(function() {
                        b.setSize(1);
                    });
                    assert.doesNotThrow(function() {
                        b.setSize(360);
                    });
                    assert.doesNotThrow(function() {
                        b.setSize(359.99);
                    });
                });
            });
            
            describe('x', function() {
                let b = new Button({size: 1, x: 0, y: 0, label: 'Some action', clickableFor: [], visibleFor: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        b.setX();
                    });
                });
                it('should be a positive number', function () {
                    assert.throws(function() {
                        b.setX(null);
                    });
                    assert.throws(function() {
                        b.setX(false);
                    });
                    assert.throws(function() {
                        b.setX(true);
                    });
                    assert.throws(function() {
                        b.setX('foobar');
                    });
                    assert.doesNotThrow(function() {
                        b.setX(1.23);
                    });
                    assert.throws(function() {
                        b.setX([1,2,3]);
                    });
                    assert.throws(function() {
                        b.setX({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        b.setX(0);
                    });
                    assert.doesNotThrow(function() {
                        b.setX(-360);
                    });
                    assert.doesNotThrow(function() {
                        b.setX(-1.23);
                    });
                    assert.doesNotThrow(function() {
                        b.setX(1);
                    });
                    assert.doesNotThrow(function() {
                        b.setX(360);
                    });
                    assert.doesNotThrow(function() {
                        b.setX(359.99);
                    });
                });
            });
            
            describe('y', function() {
                let b = new Button({size: 1, x: 0, y: 0, label: 'Some action', clickableFor: [], visibleFor: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        b.setY();
                    });
                });
                it('should be a positive number', function () {
                    assert.throws(function() {
                        b.setY(null);
                    });
                    assert.throws(function() {
                        b.setY(false);
                    });
                    assert.throws(function() {
                        b.setY(true);
                    });
                    assert.throws(function() {
                        b.setY('foobar');
                    });
                    assert.doesNotThrow(function() {
                        b.setY(1.23);
                    });
                    assert.throws(function() {
                        b.setY([1,2,3]);
                    });
                    assert.throws(function() {
                        b.setY({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        b.setY(0);
                    });
                    assert.doesNotThrow(function() {
                        b.setY(-360);
                    });
                    assert.doesNotThrow(function() {
                        b.setY(-1.23);
                    });
                    assert.doesNotThrow(function() {
                        b.setY(1);
                    });
                    assert.doesNotThrow(function() {
                        b.setY(360);
                    });
                    assert.doesNotThrow(function() {
                        b.setY(359.99);
                    });
                });
            });
            
            describe('label', function() {
                let b = new Button({size: 1, x: 0, y: 0, label: 'Some action', clickableFor: [], visibleFor: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        b.setLabel();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        b.setLabel(123);
                    });
                });
                it('may be empty', function() {
                    assert.doesNotThrow(function() {
                        b.setLabel('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        b.setLabel('Some action');
                    });
                });
            });
            
            describe('clickableFor', function() {
                let b = new Button({size: 1, x: 0, y: 0, label: 'Some action', clickableFor: [], visibleFor: []});

                it('should be defined', function () {
                    assert.throws(function() {
                        b.setClickableFor();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        b.setClickableFor(null);
                    });
                    assert.throws(function() {
                        b.setClickableFor(true);
                    });
                    assert.throws(function() {
                        b.setClickableFor('foobar');
                    });
                    assert.throws(function() {
                        b.setClickableFor('123');
                    });
                    assert.throws(function() {
                        b.setClickableFor({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        b.setClickableFor([0,1]);
                    });
                });
                it('should have only numbers', function () {
                    assert.throws(function() {
                        b.setClickableFor([0, 1, 2, 'foo']);
                    });
                    assert.throws(function() {
                        b.setClickableFor([0, 1, null, 3]);
                    });
                    assert.throws(function() {
                        b.setClickableFor([0, true, 2, 3]);
                    });
                    assert.throws(function() {
                        b.setClickableFor([1.234, 1, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        b.setClickableFor([0, 1, 2, 3]);
                    });
                });
                it('should have unique numbers greater equal than 0', function () {
                    assert.throws(function() {
                        b.setClickableFor([-1, 1, 2, 3]);
                    });
                    assert.throws(function() {
                        b.setClickableFor([-1, -1, 2, 3]);
                    });
                    assert.throws(function() {
                        b.setClickableFor([1, 2, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        b.setClickableFor([1, 2, 3, 4]);
                    });
                });
                it('may be empty', function () {
                    assert.doesNotThrow(function() {
                        b.setClickableFor([]);
                    });
                });
            });
            
            describe('visibleFor', function() {
                let b = new Button({size: 1, x: 0, y: 0, label: 'Some action', clickableFor: [], visibleFor: []});

                it('should be defined', function () {
                    assert.throws(function() {
                        b.setVisibleFor();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        b.setVisibleFor(null);
                    });
                    assert.throws(function() {
                        b.setVisibleFor(true);
                    });
                    assert.throws(function() {
                        b.setVisibleFor('foobar');
                    });
                    assert.throws(function() {
                        b.setVisibleFor('123');
                    });
                    assert.throws(function() {
                        b.setVisibleFor({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        b.setVisibleFor([0,1]);
                    });
                });
                it('should have only numbers', function () {
                    assert.throws(function() {
                        b.setVisibleFor([0, 1, 2, 'foo']);
                    });
                    assert.throws(function() {
                        b.setVisibleFor([0, 1, null, 3]);
                    });
                    assert.throws(function() {
                        b.setVisibleFor([0, true, 2, 3]);
                    });
                    assert.throws(function() {
                        b.setVisibleFor([1.234, 1, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        b.setVisibleFor([0, 1, 2, 3]);
                    });
                });
                it('should have unique numbers greater equal than 0', function () {
                    assert.throws(function() {
                        b.setVisibleFor([-1, 1, 2, 3]);
                    });
                    assert.throws(function() {
                        b.setVisibleFor([-1, -1, 2, 3]);
                    });
                    assert.throws(function() {
                        b.setVisibleFor([1, 2, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        b.setVisibleFor([1, 2, 3, 4]);
                    });
                });
                it('may be empty', function () {
                    assert.doesNotThrow(function() {
                        b.setVisibleFor([]);
                    });
                });
            });

            describe('transformToFrontend', function() {
                it('must transform {size: 1, x: 0, y: 0, label: "Some action", clickableFor: [], visibleFor: []} correctly', function() {
                    let b = new Button({size: 1, x: 0, y: 0, label: "Some action", clickableFor: [], visibleFor: []});

                    assert.deepEqual(b.transformToFrontend(0), {size: 1, x: 0, y: 0, label: "Some action", clickable: false, visible: false});
                    assert.deepEqual(b.transformToFrontend(1), {size: 1, x: 0, y: 0, label: "Some action", clickable: false, visible: false});
                    assert.deepEqual(b.transformToFrontend(2), {size: 1, x: 0, y: 0, label: "Some action", clickable: false, visible: false});
                });
                it('must transform {size: 1, x: 0, y: 0, label: "Some action", clickableFor: [1,2], visibleFor: []} correctly', function() {
                    let b = new Button({size: 1, x: 0, y: 0, label: "Some action", clickableFor: [1,2], visibleFor: []});

                    assert.deepEqual(b.transformToFrontend(0), {size: 1, x: 0, y: 0, label: "Some action", clickable: false, visible: false});
                    assert.deepEqual(b.transformToFrontend(1), {size: 1, x: 0, y: 0, label: "Some action", clickable: true, visible: false});
                    assert.deepEqual(b.transformToFrontend(2), {size: 1, x: 0, y: 0, label: "Some action", clickable: true, visible: false});
                });
                it('must transform {size: 1, x: 0, y: 0, label: "Some action", clickableFor: [], visibleFor: [0,2]} correctly', function() {
                    let b = new Button({size: 1, x: 0, y: 0, label: "Some action", clickableFor: [], visibleFor: [0,2]});

                    assert.deepEqual(b.transformToFrontend(0), {size: 1, x: 0, y: 0, label: "Some action", clickable: false, visible: true});
                    assert.deepEqual(b.transformToFrontend(1), {size: 1, x: 0, y: 0, label: "Some action", clickable: false, visible: false});
                    assert.deepEqual(b.transformToFrontend(2), {size: 1, x: 0, y: 0, label: "Some action", clickable: false, visible: true});
                });
            });
        });
    });
});