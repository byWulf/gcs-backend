'use strict';

const assert    = require('chai').assert;
const CardFanContainer = require(__dirname + '/../../../lib/game/element/cardFanContainer_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('cardFanContainer_v1', function() {
            it('should instantiate without error', function() {
                let cfc = new CardFanContainer({inverted: false});
                assert.instanceOf(cfc, CardFanContainer);
            });
            describe('setInverted', function() {
                let cfc = new CardFanContainer({inverted: false});

                it('must be defined', function() {
                    assert.throws(function() {
                        cfc.setInverted();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        cfc.setInverted(123);
                    });
                });
                it('must not be a string', function() {
                    assert.throws(function() {
                        cfc.setInverted('foobar');
                    });
                });
                it('must allow "true"', function() {
                    assert.doesNotThrow(function() {
                        cfc.setInverted(true);
                    });
                });
                it('must allow "false"', function() {
                    assert.doesNotThrow(function() {
                        cfc.setInverted(false);
                    });
                });
            });
            describe('transformToFrontend', function() {
                it('must transform {inverted: false} correctly', function() {
                    let cfc = new CardFanContainer({inverted: false});

                    assert.deepEqual(cfc.transformToFrontend(0), {inverted: false});
                });
                it('must transform {inverted: true} correctly', function() {
                    let cfc = new CardFanContainer({inverted: true});

                    assert.deepEqual(cfc.transformToFrontend(0), {inverted: true});
                });
            });
        });
    });
});