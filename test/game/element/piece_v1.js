'use strict';

const assert    = require('chai').assert;
const Piece = require(__dirname + '/../../../lib/game/element/piece_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('piece_v1', function() {
            it('should instantiate without error', function() {
                let p = new Piece({image: 'a', model: 'b', clickableFor: [], canBeAttachedTo: []});
                assert.instanceOf(p, Piece);
            });
            describe('image', function() {
                let p = new Piece({image: 'a', model: 'b', clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        p.setImage();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        p.setImage(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        p.setImage('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        p.setImage('images/someimage.jpg');
                    });
                });
            });
            describe('model', function() {
                let p = new Piece({image: 'a', model: 'b', clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        p.setModel();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        p.setModel(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        p.setModel('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        p.setModel('models/somemodel.obj');
                    });
                });
            });
            describe('clickableFor', function() {
                let p = new Piece({image: 'a', model: 'b', clickableFor: [], canBeAttachedTo: []});

                it('should be defined', function () {
                    assert.throws(function() {
                        p.setClickableFor();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        p.setClickableFor(null);
                    });
                    assert.throws(function() {
                        p.setClickableFor(true);
                    });
                    assert.throws(function() {
                        p.setClickableFor('foobar');
                    });
                    assert.throws(function() {
                        p.setClickableFor('123');
                    });
                    assert.throws(function() {
                        p.setClickableFor({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        p.setClickableFor([0,1]);
                    });
                });
                it('should have only numbers', function () {
                    assert.throws(function() {
                        p.setClickableFor([0, 1, 2, 'foo']);
                    });
                    assert.throws(function() {
                        p.setClickableFor([0, 1, null, 3]);
                    });
                    assert.throws(function() {
                        p.setClickableFor([0, true, 2, 3]);
                    });
                    assert.throws(function() {
                        p.setClickableFor([1.234, 1, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        p.setClickableFor([0, 1, 2, 3]);
                    });
                });
                it('should have unique numbers greater equal than 0', function () {
                    assert.throws(function() {
                        p.setClickableFor([-1, 1, 2, 3]);
                    });
                    assert.throws(function() {
                        p.setClickableFor([-1, -1, 2, 3]);
                    });
                    assert.throws(function() {
                        p.setClickableFor([1, 2, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        p.setClickableFor([1, 2, 3, 4]);
                    });
                });
                it('may be empty', function () {
                    assert.doesNotThrow(function() {
                        p.setClickableFor([]);
                    });
                });
            });
            describe('canBeAttachedTo', function() {
                let p = new Piece({image: 'a', model: 'b', clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo();
                    });
                });
                it('must not be a string', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo('foobar');
                    });
                });

                it('must not be a number', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo(0.5);
                    });
                });

                it('can be empty', function() {
                    assert.doesNotThrow(function() {
                        p.setCanBeAttachedTo([]);
                    });
                });

                it('the first element must not be a string', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo(['foobar',{containerId: 'foobar', index: 0, byPlayers: [0]}]);
                    });
                });

                it('the first element must not be a number', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo([123,{containerId: 'foobar', index: 0, byPlayers: [0]}]);
                    });
                });

                it('the first element must not be an empty object', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo([{},{containerId: 'foobar', index: 0, byPlayers: [0]}]);
                    });
                });

                it('the second element must not be a string', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0]},'foobar']);
                    });
                });

                it('the second element must not be a number', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0]},123]);
                    });
                });

                it('the second element must not be an empty object', function() {
                    assert.throws(function() {
                        p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0]},{}]);
                    });
                });

                describe('containerId', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{index: 0, byPlayers: [0]}]);
                        });
                    });
                    it('should be a string', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: null, index: 0, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: true, index: 0, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 1, index: 0, byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0]}]);
                        });
                    });
                });

                describe('index', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', byPlayers: [0]}]);
                        });
                    });
                    it('should be a positive integer', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: null, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: true, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 'foobar', byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 1.234, byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 5, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: -3, byPlayers: [0]}]);
                        });
                    });
                });

                describe('byPlayers', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0}]);
                        });
                    });

                    it('should be an array', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: null}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: true}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: 'foobar'}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: '123'}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: {foo: 'bar'}}]);
                        });
                        assert.doesNotThrow(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0,1]}]);
                        });
                    });
                    it('should have only numbers', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0, 1, 2, 'foo']}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0, 1, null, 3]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0, true, 2, 3]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [1.234, 1, 2, 3]}]);
                        });
                        assert.doesNotThrow(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [0, 1, 2, 3]}]);
                        });
                    });
                    it('should have unique numbers greater equal than 0', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [-1, 1, 2, 3]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [-1, -1, 2, 3]}]);
                        });
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [1, 2, 2, 3]}]);
                        });
                        assert.doesNotThrow(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: [1, 2, 3, 4]}]);
                        });
                    });
                    it('must not be empty', function () {
                        assert.throws(function() {
                            p.setCanBeAttachedTo([{containerId: 'foobar', index: 0, byPlayers: []}]);
                        });
                    });
                });

                it('should not accept more than 10000 items', function() {
                    let items = [];
                    for (let i = 0; i < 10001; i++) {
                        items.push({containerId: 'foobar', index: i, byPlayers: [0]});
                    }
                    assert.throws(function() {
                        p.setCanBeAttachedTo(items);
                    });

                    items.splice(0,1);
                    assert.doesNotThrow(function() {
                        p.setCanBeAttachedTo(items);
                    });
                });

                it('should accept a correct list of items', function() {
                    assert.doesNotThrow(function() {
                        p.setCanBeAttachedTo([
                            {containerId: 'foobar', index: 0, byPlayers: [1, 2, 3, 4]},
                            {containerId: 'foobar', index: 1, byPlayers: [1, 2, 3, 4]},
                            {containerId: 'foobar', index: 2, byPlayers: [1, 2, 3, 4]}
                        ]);
                    });
                });
            });
            
            describe('transformToFrontend', function() {
                it('must transform {image: "a", model: "b", clickableFor: [], canBeAttachedTo: []} correctly', function() {
                    let p = new Piece({image: 'a', model: 'b', clickableFor: [], canBeAttachedTo: []});

                    assert.deepEqual(p.transformToFrontend(0), {image: "a", model: "b", clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(p.transformToFrontend(1), {image: "a", model: "b", clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(p.transformToFrontend(2), {image: "a", model: "b", clickable: false, canBeAttachedTo: []});
                });
                it('must transform {image: "a", model: "b", clickableFor: [0,2], canBeAttachedTo: []} correctly', function() {
                    let p = new Piece({image: 'a', model: 'b', clickableFor: [0,2], canBeAttachedTo: []});

                    assert.deepEqual(p.transformToFrontend(0), {image: "a", model: "b", clickable: true, canBeAttachedTo: []});
                    assert.deepEqual(p.transformToFrontend(1), {image: "a", model: "b", clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(p.transformToFrontend(2), {image: "a", model: "b", clickable: true, canBeAttachedTo: []});
                });
                it('must transform {image: "a", model: "b", clickableFor: [], canBeAttachedTo: [{containerId: "foobar", index: 1, byPlayers: [0,1]},{containerId: "foobar", index: 2, byPlayers: [2]},{containerId: "bat", index: 1, byPlayers: [2]}]} correctly', function() {
                    let p = new Piece({image: 'a', model: 'b', clickableFor: [], canBeAttachedTo: [{containerId: "foobar", index: 1, byPlayers: [0,1]},{containerId: "foobar", index: 2, byPlayers: [2]},{containerId: "bat", index: 1, byPlayers: [2]}]});

                    assert.deepEqual(p.transformToFrontend(0), {image: "a", model: "b", clickable: false, canBeAttachedTo: [{containerId: 'foobar', index: 1}]});
                    assert.deepEqual(p.transformToFrontend(1), {image: "a", model: "b", clickable: false, canBeAttachedTo: [{containerId: 'foobar', index: 1}]});
                    assert.deepEqual(p.transformToFrontend(2), {image: "a", model: "b", clickable: false, canBeAttachedTo: [{containerId: 'foobar', index: 2},{containerId: 'bat', index: 1}]});
                });
            });
        });
    });
});