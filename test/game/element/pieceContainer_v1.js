'use strict';

const assert    = require('chai').assert;
const PieceContainer = require(__dirname + '/../../../lib/game/element/pieceContainer_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('pieceContainer_v1', function() {
            it('should instantiate without error', function() {
                let pc = new PieceContainer({positions: [{x: 0, y: 0}]});
                assert.instanceOf(pc, PieceContainer);
            });
            describe('setPositions', function() {
                let pc = new PieceContainer({positions: [{x: 0, y: 0}]});

                it('must be defined', function() {
                    assert.throws(function() {
                        pc.setPositions();
                    });
                });
                it('must not be a string', function() {
                    assert.throws(function() {
                        pc.setPositions('foobar');
                    });
                });

                it('must not be a number', function() {
                    assert.throws(function() {
                        pc.setPositions(0.5);
                    });
                });

                it('must contain at least one element', function() {
                    assert.throws(function() {
                        pc.setPositions([]);
                    });
                });

                it('the first element must not be a string', function() {
                    assert.throws(function() {
                        pc.setPositions(['foobar',{x: 0, y: 0}]);
                    });
                });

                it('the first element must not be a number', function() {
                    assert.throws(function() {
                        pc.setPositions([123,{x: 0, y: 0}]);
                    });
                });

                it('the first element must not be an empty object', function() {
                    assert.throws(function() {
                        pc.setPositions([{},{x: 0, y: 0}]);
                    });
                });

                it('the second element must not be a string', function() {
                    assert.throws(function() {
                        pc.setPositions([{x: 0, y: 0},'foobar']);
                    });
                });

                it('the second element must not be a number', function() {
                    assert.throws(function() {
                        pc.setPositions([{x: 0, y: 0},123]);
                    });
                });

                it('the second element must not be an empty object', function() {
                    assert.throws(function() {
                        pc.setPositions([{x: 0, y: 0},{}]);
                    });
                });

                it('the x-coordinate must be between -1 and 1', function() {
                    assert.throws(function() {
                        pc.setPositions([{x: -1.1, y: 0}]);
                    });
                    assert.throws(function() {
                        pc.setPositions([{x: 1.1, y: 0}]);
                    });
                    assert.doesNotThrow(function() {
                        pc.setPositions([{x: -1, y: 0}]);
                    });
                    assert.doesNotThrow(function() {
                        pc.setPositions([{x: 1, y: 0}]);
                    });
                    assert.doesNotThrow(function() {
                        pc.setPositions([{x: 0.5, y: 0}]);
                    });
                });

                it('the y-coordinate must be between -1 and 1', function() {
                    assert.throws(function() {
                        pc.setPositions([{x: 0, y: -1.1}]);
                    });
                    assert.throws(function() {
                        pc.setPositions([{x: 0, y: 1.1}]);
                    });
                    assert.doesNotThrow(function() {
                        pc.setPositions([{x: 0, y: -1}]);
                    });
                    assert.doesNotThrow(function() {
                        pc.setPositions([{x: 0, y: 1}]);
                    });
                    assert.doesNotThrow(function() {
                        pc.setPositions([{x: 0, y: 0.5}]);
                    });
                });

                it('should not accept more than 10000 positions', function() {
                    let positions = [];
                    for (let i = 0; i < 10001; i++) {
                        positions.push({x: i/20000, y: 0});
                    }
                    assert.throws(function() {
                        pc.setPositions(positions);
                    });

                    positions.splice(0,1);
                    assert.doesNotThrow(function() {
                        pc.setPositions(positions);
                    });
                });

                it('should accept a correct list of positions', function() {
                    assert.doesNotThrow(function() {
                        pc.setPositions([{x: 0.1, y: 0.5},{x: 0.1, y: 0.1},{x: 0.2, y: 0.15},{x: 0.2, y: 0.2},{x: 0.15, y: 0.3},{x: 0.4, y: 0.4},{x: -0.5, y: -0.6}]);
                    });
                });
            });
            describe('transformToFrontend', function() {
                it('must transform {positions: [{x: 0.5, y: 0}]} correctly', function() {
                    let pc = new PieceContainer({positions: [{x: 0.5, y: 0}]});

                    assert.deepEqual(pc.transformToFrontend(0), {positions: [{x: 0.5, y: 0}]});
                });
                it('must transform {positions: [{x: 0.5, y: 0},{x: -1, y: -1}]} correctly', function() {
                    let pc = new PieceContainer({positions: [{x: 0.5, y: 0},{x: -1, y: -1}]});

                    assert.deepEqual(pc.transformToFrontend(0), {positions: [{x: 0.5, y: 0},{x: -1, y: -1}]});
                });
                it('must transform {positions: [{x: 0.1, y: 0.5},{x: 0.1, y: 0.1},{x: 0.2, y: 0.15},{x: 0.2, y: 0.2},{x: 0.15, y: 0.3},{x: 0.4, y: 0.4},{x: -0.5, y: -0.6}]} correctly', function() {
                    let pc = new PieceContainer({positions: [{x: 0.1, y: 0.5},{x: 0.1, y: 0.1},{x: 0.2, y: 0.15},{x: 0.2, y: 0.2},{x: 0.15, y: 0.3},{x: 0.4, y: 0.4},{x: -0.5, y: -0.6}]});

                    assert.deepEqual(pc.transformToFrontend(0), {positions: [{x: 0.1, y: 0.5},{x: 0.1, y: 0.1},{x: 0.2, y: 0.15},{x: 0.2, y: 0.2},{x: 0.15, y: 0.3},{x: 0.4, y: 0.4},{x: -0.5, y: -0.6}]});
                });
            });
        });
    });
});