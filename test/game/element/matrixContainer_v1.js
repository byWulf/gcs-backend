'use strict';

const assert    = require('chai').assert;
const MatrixContainer = require(__dirname + '/../../../lib/game/element/matrixContainer_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('matrixContainer_v1', function() {
            it('should instantiate without error', function() {
                let mc = new MatrixContainer({tileForm: 'square'});
                assert.instanceOf(mc, MatrixContainer);
            });
            describe('setTileForm', function() {
                let mc = new MatrixContainer({tileForm: 'square'});

                it('must be defined', function() {
                    assert.throws(function() {
                        mc.setTileForm();
                    });
                });
                it('must be a string', function() {
                    assert.throws(function() {
                        mc.setTileForm(123);
                    });
                });
                it('must not allow "foobar"', function() {
                    assert.throws(function() {
                        mc.setTileForm('foobar');
                    });
                });
                it('must not allow "something"', function() {
                    assert.throws(function() {
                        mc.setTileForm('something');
                    });
                });
                it('must allow "square"', function() {
                    assert.doesNotThrow(function() {
                        mc.setTileForm('square');
                    });
                });
                it('must allow "hexagonal"', function() {
                    assert.doesNotThrow(function() {
                        mc.setTileForm('hexagonal');
                    });
                });
                it('must allow "triangular"', function() {
                    assert.doesNotThrow(function() {
                        mc.setTileForm('triangular');
                    });
                });
            });
            describe('transformToFrontend', function() {
                it('must transform {tileForm: "square"} correctly', function() {
                    let mc = new MatrixContainer({tileForm: 'square'});

                    assert.deepEqual(mc.transformToFrontend(0), {tileForm: 'square'});
                });
                it('must transform {tileForm: "hexagonal"} correctly', function() {
                    let mc = new MatrixContainer({tileForm: 'hexagonal'});

                    assert.deepEqual(mc.transformToFrontend(0), {tileForm: 'hexagonal'});
                });
                it('must transform {tileForm: "triangular"} correctly', function() {
                    let mc = new MatrixContainer({tileForm: 'triangular'});

                    assert.deepEqual(mc.transformToFrontend(0), {tileForm: 'triangular'});
                });
            });
        });
    });
});