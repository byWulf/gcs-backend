'use strict';

const assert    = require('chai').assert;
const CardStackContainer = require(__dirname + '/../../../lib/game/element/cardStackContainer_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('cardStackContainer_v1', function() {
            it('should instantiate without error', function() {
                let csc = new CardStackContainer({type: 'ordered'});
                assert.instanceOf(csc, CardStackContainer);
            });
            describe('setType', function() {
                let csc = new CardStackContainer({type: 'ordered'});

                it('must be defined', function() {
                    assert.throws(function() {
                        csc.setType();
                    });
                });
                it('must be a string', function() {
                    assert.throws(function() {
                        csc.setType(123);
                    });
                });
                it('must not allow "foobar"', function() {
                    assert.throws(function() {
                        csc.setType('foobar');
                    });
                });
                it('must not allow "something"', function() {
                    assert.throws(function() {
                        csc.setType('something');
                    });
                });
                it('must allow "ordered"', function() {
                    assert.doesNotThrow(function() {
                        csc.setType('ordered');
                    });
                });
                it('must allow "messy"', function() {
                    assert.doesNotThrow(function() {
                        csc.setType('messy');
                    });
                });
                it('must allow "random"', function() {
                    assert.doesNotThrow(function() {
                        csc.setType('random');
                    });
                });
            });
            describe('transformToFrontend', function() {
                it('must transform {type: "ordered"} correctly', function() {
                    let csc = new CardStackContainer({type: "ordered"});

                    assert.deepEqual(csc.transformToFrontend(0), {type: "ordered"});
                });
                it('must transform {type: "messy"} correctly', function() {
                    let csc = new CardStackContainer({type: "messy"});

                    assert.deepEqual(csc.transformToFrontend(0), {type: "messy"});
                });
                it('must transform {type: "random"} correctly', function() {
                    let csc = new CardStackContainer({type: "random"});

                    assert.deepEqual(csc.transformToFrontend(0), {type: "random"});
                });
            });
        });
    });
});