'use strict';

const assert    = require('chai').assert;
const CardListContainer = require(__dirname + '/../../../lib/game/element/cardListContainer_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('cardListContainer_v1', function() {
            it('should instantiate without error', function() {
                let clc = new CardListContainer();
                assert.instanceOf(clc, CardListContainer);
            });
            describe('transformToFrontend', function() {
                it('must transform correctly', function() {
                    let clc = new CardListContainer();

                    assert.deepEqual(clc.transformToFrontend(0), {});
                });
            });
        });
    });
});