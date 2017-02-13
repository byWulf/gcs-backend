'use strict';

const assert    = require('chai').assert;
const Tile = require(__dirname + '/../../../lib/game/element/tile_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('tile_v1', function() {
            it('should instantiate without error', function() {
                let t = new Tile({frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});
                assert.instanceOf(t, Tile);
            });
            describe('frontImage', function() {
                let t = new Tile({frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        t.setFrontImage();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        t.setFrontImage(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        t.setFrontImage('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        t.setFrontImage('images/someimage.jpg');
                    });
                });
            });
            describe('backImage', function() {
                let t = new Tile({frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        t.setBackImage();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        t.setBackImage(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        t.setBackImage('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        t.setBackImage('images/someimage.jpg');
                    });
                });
            });
            describe('side', function() {
                let t = new Tile({frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        t.setSide();
                    });
                });
                it('must be a string', function() {
                    assert.throws(function() {
                        t.setSide(123);
                    });
                });
                it('must not allow "foobar"', function() {
                    assert.throws(function() {
                        t.setSide('foobar');
                    });
                });
                it('must not allow "something"', function() {
                    assert.throws(function() {
                        t.setSide('something');
                    });
                });
                it('must allow "front"', function() {
                    assert.doesNotThrow(function() {
                        t.setSide('front');
                    });
                });
                it('must allow "back"', function() {
                    assert.doesNotThrow(function() {
                        t.setSide('back');
                    });
                });
            });
            describe('rotation', function() {
                let t = new Tile({frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        t.setRotation();
                    });
                });
                it('should be a number greater equal than 0 and less than 360', function () {
                    assert.throws(function() {
                        t.setRotation(null);
                    });
                    assert.throws(function() {
                        t.setRotation(false);
                    });
                    assert.throws(function() {
                        t.setRotation(true);
                    });
                    assert.throws(function() {
                        t.setRotation('foobar');
                    });
                    assert.doesNotThrow(function() {
                        t.setRotation(1.23);
                    });
                    assert.throws(function() {
                        t.setRotation([1,2,3]);
                    });
                    assert.throws(function() {
                        t.setRotation({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        t.setRotation(0);
                    });
                    assert.throws(function() {
                        t.setRotation(-360);
                    });
                    assert.doesNotThrow(function() {
                        t.setRotation(1);
                    });
                    assert.throws(function() {
                        t.setRotation(360);
                    });
                    assert.doesNotThrow(function() {
                        t.setRotation(359.99);
                    });
                });
            });
            describe('frontVisibleFor', function() {
                let t = new Tile({frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('should be defined', function () {
                    assert.throws(function() {
                        t.setFrontVisibleFor();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        t.setFrontVisibleFor(null);
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor(true);
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor('foobar');
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor('123');
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        t.setFrontVisibleFor([0,1]);
                    });
                });
                it('should have only numbers', function () {
                    assert.throws(function() {
                        t.setFrontVisibleFor([0, 1, 2, 'foo']);
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor([0, 1, null, 3]);
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor([0, true, 2, 3]);
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor([1.234, 1, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        t.setFrontVisibleFor([0, 1, 2, 3]);
                    });
                });
                it('should have unique numbers greater equal than 0', function () {
                    assert.throws(function() {
                        t.setFrontVisibleFor([-1, 1, 2, 3]);
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor([-1, -1, 2, 3]);
                    });
                    assert.throws(function() {
                        t.setFrontVisibleFor([1, 2, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        t.setFrontVisibleFor([1, 2, 3, 4]);
                    });
                });
                it('may be empty', function () {
                    assert.doesNotThrow(function() {
                        t.setFrontVisibleFor([]);
                    });
                });
            });
            describe('clickableFor', function() {
                let t = new Tile({frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('should be defined', function () {
                    assert.throws(function() {
                        t.setClickableFor();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        t.setClickableFor(null);
                    });
                    assert.throws(function() {
                        t.setClickableFor(true);
                    });
                    assert.throws(function() {
                        t.setClickableFor('foobar');
                    });
                    assert.throws(function() {
                        t.setClickableFor('123');
                    });
                    assert.throws(function() {
                        t.setClickableFor({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        t.setClickableFor([0,1]);
                    });
                });
                it('should have only numbers', function () {
                    assert.throws(function() {
                        t.setClickableFor([0, 1, 2, 'foo']);
                    });
                    assert.throws(function() {
                        t.setClickableFor([0, 1, null, 3]);
                    });
                    assert.throws(function() {
                        t.setClickableFor([0, true, 2, 3]);
                    });
                    assert.throws(function() {
                        t.setClickableFor([1.234, 1, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        t.setClickableFor([0, 1, 2, 3]);
                    });
                });
                it('should have unique numbers greater equal than 0', function () {
                    assert.throws(function() {
                        t.setClickableFor([-1, 1, 2, 3]);
                    });
                    assert.throws(function() {
                        t.setClickableFor([-1, -1, 2, 3]);
                    });
                    assert.throws(function() {
                        t.setClickableFor([1, 2, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        t.setClickableFor([1, 2, 3, 4]);
                    });
                });
                it('may be empty', function () {
                    assert.doesNotThrow(function() {
                        t.setClickableFor([]);
                    });
                });
            });
            describe('canBeAttachedTo', function() {
                let t = new Tile({frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo();
                    });
                });
                it('must not be a string', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo('foobar');
                    });
                });

                it('must not be a number', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo(0.5);
                    });
                });

                it('can be empty', function() {
                    assert.doesNotThrow(function() {
                        t.setCanBeAttachedTo([]);
                    });
                });

                it('the first element must not be a string', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo(['foobar',{containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                    });
                });

                it('the first element must not be a number', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo([123,{containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                    });
                });

                it('the first element must not be an empty object', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo([{},{containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                    });
                });

                it('the second element must not be a string', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [0]},'foobar']);
                    });
                });

                it('the second element must not be a number', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [0]},123]);
                    });
                });

                it('the second element must not be an empty object', function() {
                    assert.throws(function() {
                        t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [0]},{}]);
                    });
                });

                describe('containerId', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                        });
                    });
                    it('should be a string', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: null, x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: true, x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 1, x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                        });
                    });
                });

                describe('x', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', y: 0, rotations: [0], byPlayers: [0]}]);
                        });
                    });
                    it('should be an integer', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', y: 0, x: null, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', y: 0, x: true, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', y: 0, x: 'foobar', rotations: [0], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', y: 0, x: 0, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', y: 0, x: 1.234, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', y: 0, x: 5, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', y: 0, x: -3, rotations: [0], byPlayers: [0]}]);
                        });
                    });
                });

                describe('y', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, rotations: [0], byPlayers: [0]}]);
                        });
                    });
                    it('should be an integer', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: null, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: true, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 'foobar', rotations: [0], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 1.234, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 5, rotations: [0], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: -3, rotations: [0], byPlayers: [0]}]);
                        });
                    });
                });

                describe('rotations', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, byPlayers: [0]}]);
                        });
                    });

                    it('should be an array', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: null, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: true, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: 'foobar', byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: '123', byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: {foo: 'bar'}, byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0,1], byPlayers: [0]}]);
                        });
                    });
                    it('should have only numbers', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0, 1, 2, 'foo'], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0, 1, null, 3], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0, true, 2, 3], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [1.234, 1, 2, 3], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0, 1, 2, 3], byPlayers: [0]}]);
                        });
                    });
                    it('should have unique numbers greater equal than 0 and less than 360', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [-1, 1, 2, 3], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [-1, -1, 2, 3], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [1, 2, 2, 3], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [1, 2, 3, 4], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [1, 2, 3, 360], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [1, 2, 3, 359.99], byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [0, 2, 3, 4], byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [-0.1, 2, 3, 4], byPlayers: [0]}]);
                        });
                    });
                    it('must not be empty', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', x: 0, y: 0, rotations: [], byPlayers: [0]}]);
                        });
                    });
                });

                describe('byPlayers', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0}]);
                        });
                    });

                    it('should be an array', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: null}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: true}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: 'foobar'}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: '123'}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: {foo: 'bar'}}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [0,1]}]);
                        });
                    });
                    it('should have only numbers', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [0, 1, 2, 'foo']}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [0, 1, null, 3]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [0, true, 2, 3]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [1.234, 1, 2, 3]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [0, 1, 2, 3]}]);
                        });
                    });
                    it('should have unique numbers greater equal than 0', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [-1, 1, 2, 3]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [-1, -1, 2, 3]}]);
                        });
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [1, 2, 2, 3]}]);
                        });
                        assert.doesNotThrow(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [1, 2, 3, 4]}]);
                        });
                    });
                    it('must not be empty', function () {
                        assert.throws(function() {
                            t.setCanBeAttachedTo([{containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: []}]);
                        });
                    });
                });

                it('should not accept more than 10000 items', function() {
                    let items = [];
                    for (let i = 0; i < 10001; i++) {
                        items.push({containerId: 'foobar', rotations: [0], x: 0, y: 0, byPlayers: [0]});
                    }
                    assert.throws(function() {
                        t.setCanBeAttachedTo(items);
                    });

                    items.splice(0,1);
                    assert.doesNotThrow(function() {
                        t.setCanBeAttachedTo(items);
                    });
                });

                it('should accept a correct list of items', function() {
                    assert.doesNotThrow(function() {
                        t.setCanBeAttachedTo([
                            {containerId: 'foobar', x: 0, y: 0, rotations: [0], byPlayers: [1, 2, 3, 4]},
                            {containerId: 'foobar', x: 1, y: 3, rotations: [0], byPlayers: [1, 2, 3, 4]},
                            {containerId: 'foobar', x: 2, y: 4, rotations: [0], byPlayers: [1, 2, 3, 4]}
                        ]);
                    });
                });
            });
            
            describe('transformToFrontend', function() {
                it('must transform {frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []} correctly', function() {
                    let t = new Tile({frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                    assert.deepEqual(t.transformToFrontend(0), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(t.transformToFrontend(1), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(t.transformToFrontend(2), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                });
                it('must transform {frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [1,2], clickableFor: [], canBeAttachedTo: []} correctly', function() {
                    let t = new Tile({frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [1,2], clickableFor: [], canBeAttachedTo: []});

                    assert.deepEqual(t.transformToFrontend(0), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(t.transformToFrontend(1), {frontImage: "a", backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(t.transformToFrontend(2), {frontImage: "a", backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                });
                it('must transform {frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [0,2], canBeAttachedTo: []} correctly', function() {
                    let t = new Tile({frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [0,2], canBeAttachedTo: []});

                    assert.deepEqual(t.transformToFrontend(0), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: true, canBeAttachedTo: []});
                    assert.deepEqual(t.transformToFrontend(1), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(t.transformToFrontend(2), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: true, canBeAttachedTo: []});
                });
                it('must transform {frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: [{containerId: "foobar", x: -1, y: -1, byPlayers: [0,1]},{containerId: "foobar", x: 1, y: 2, byPlayers: [2]},{containerId: "bat", x: -1, y: 3, byPlayers: [2]}]} correctly', function() {
                    let t = new Tile({frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: [{containerId: "foobar", x: -1, y: -1, rotations: [0, 90], byPlayers: [0,1]},{containerId: "foobar", x: 1, y: 2, rotations: [270], byPlayers: [2]},{containerId: "bat", x: -1, y: 3, rotations: [0], byPlayers: [2]}]});

                    assert.deepEqual(t.transformToFrontend(0), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: [{containerId: 'foobar', x: -1, y: -1, rotations: [0, 90]}]});
                    assert.deepEqual(t.transformToFrontend(1), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: [{containerId: 'foobar', x: -1, y: -1, rotations: [0, 90]}]});
                    assert.deepEqual(t.transformToFrontend(2), {frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: [{containerId: 'foobar', x: 1, y: 2, rotations: [270]},{containerId: 'bat', x: -1, y: 3, rotations: [0]}]});
                });
            });
        });
    });
});