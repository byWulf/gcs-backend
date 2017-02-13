'use strict';

const assert    = require('chai').assert;
const Card = require(__dirname + '/../../../lib/game/element/card_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('card_v1', function() {
            it('should instantiate without error', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});
                assert.instanceOf(c, Card);
            });
            describe('order', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        c.setOrder();
                    });
                });
                it('should be an integer', function () {
                    assert.throws(function() {
                        c.setOrder(null);
                    });
                    assert.throws(function() {
                        c.setOrder(false);
                    });
                    assert.throws(function() {
                        c.setOrder(true);
                    });
                    assert.throws(function() {
                        c.setOrder('foobar');
                    });
                    assert.throws(function() {
                        c.setOrder(1.23);
                    });
                    assert.throws(function() {
                        c.setOrder([1,2,3]);
                    });
                    assert.throws(function() {
                        c.setOrder({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        c.setOrder(0);
                    });
                });
            });
            describe('frontImage', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        c.setFrontImage();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        c.setFrontImage(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        c.setFrontImage('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        c.setFrontImage('images/someimage.jpg');
                    });
                });
            });
            describe('backImage', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        c.setBackImage();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        c.setBackImage(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        c.setBackImage('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        c.setBackImage('images/someimage.jpg');
                    });
                });
            });
            describe('side', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        c.setSide();
                    });
                });
                it('must be a string', function() {
                    assert.throws(function() {
                        c.setSide(123);
                    });
                });
                it('must not allow "foobar"', function() {
                    assert.throws(function() {
                        c.setSide('foobar');
                    });
                });
                it('must not allow "something"', function() {
                    assert.throws(function() {
                        c.setSide('something');
                    });
                });
                it('must allow "front"', function() {
                    assert.doesNotThrow(function() {
                        c.setSide('front');
                    });
                });
                it('must allow "back"', function() {
                    assert.doesNotThrow(function() {
                        c.setSide('back');
                    });
                });
            });
            describe('rotation', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        c.setRotation();
                    });
                });
                it('should be a number greater equal than 0 and less than 360', function () {
                    assert.throws(function() {
                        c.setRotation(null);
                    });
                    assert.throws(function() {
                        c.setRotation(false);
                    });
                    assert.throws(function() {
                        c.setRotation(true);
                    });
                    assert.throws(function() {
                        c.setRotation('foobar');
                    });
                    assert.doesNotThrow(function() {
                        c.setRotation(1.23);
                    });
                    assert.throws(function() {
                        c.setRotation([1,2,3]);
                    });
                    assert.throws(function() {
                        c.setRotation({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        c.setRotation(0);
                    });
                    assert.throws(function() {
                        c.setRotation(-360);
                    });
                    assert.doesNotThrow(function() {
                        c.setRotation(1);
                    });
                    assert.throws(function() {
                        c.setRotation(360);
                    });
                    assert.doesNotThrow(function() {
                        c.setRotation(359.99);
                    });
                });
            });
            describe('frontVisibleFor', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('should be defined', function () {
                    assert.throws(function() {
                        c.setFrontVisibleFor();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        c.setFrontVisibleFor(null);
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor(true);
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor('foobar');
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor('123');
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        c.setFrontVisibleFor([0,1]);
                    });
                });
                it('should have only numbers', function () {
                    assert.throws(function() {
                        c.setFrontVisibleFor([0, 1, 2, 'foo']);
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor([0, 1, null, 3]);
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor([0, true, 2, 3]);
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor([1.234, 1, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        c.setFrontVisibleFor([0, 1, 2, 3]);
                    });
                });
                it('should have unique numbers greater equal than 0', function () {
                    assert.throws(function() {
                        c.setFrontVisibleFor([-1, 1, 2, 3]);
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor([-1, -1, 2, 3]);
                    });
                    assert.throws(function() {
                        c.setFrontVisibleFor([1, 2, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        c.setFrontVisibleFor([1, 2, 3, 4]);
                    });
                });
                it('may be empty', function () {
                    assert.doesNotThrow(function() {
                        c.setFrontVisibleFor([]);
                    });
                });
            });
            describe('clickableFor', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('should be defined', function () {
                    assert.throws(function() {
                        c.setClickableFor();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        c.setClickableFor(null);
                    });
                    assert.throws(function() {
                        c.setClickableFor(true);
                    });
                    assert.throws(function() {
                        c.setClickableFor('foobar');
                    });
                    assert.throws(function() {
                        c.setClickableFor('123');
                    });
                    assert.throws(function() {
                        c.setClickableFor({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        c.setClickableFor([0,1]);
                    });
                });
                it('should have only numbers', function () {
                    assert.throws(function() {
                        c.setClickableFor([0, 1, 2, 'foo']);
                    });
                    assert.throws(function() {
                        c.setClickableFor([0, 1, null, 3]);
                    });
                    assert.throws(function() {
                        c.setClickableFor([0, true, 2, 3]);
                    });
                    assert.throws(function() {
                        c.setClickableFor([1.234, 1, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        c.setClickableFor([0, 1, 2, 3]);
                    });
                });
                it('should have unique numbers greater equal than 0', function () {
                    assert.throws(function() {
                        c.setClickableFor([-1, 1, 2, 3]);
                    });
                    assert.throws(function() {
                        c.setClickableFor([-1, -1, 2, 3]);
                    });
                    assert.throws(function() {
                        c.setClickableFor([1, 2, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        c.setClickableFor([1, 2, 3, 4]);
                    });
                });
                it('may be empty', function () {
                    assert.doesNotThrow(function() {
                        c.setClickableFor([]);
                    });
                });
            });
            describe('canBeAttachedTo', function() {
                let c = new Card({order: 0, frontImage: 'a', backImage: 'b', side: 'front', rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                it('must be defined', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo();
                    });
                });
                it('must not be a string', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo('foobar');
                    });
                });

                it('must not be a number', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo(0.5);
                    });
                });

                it('can be empty', function() {
                    assert.doesNotThrow(function() {
                        c.setCanBeAttachedTo([]);
                    });
                });

                it('the first element must not be a string', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo(['foobar',{containerId: 'foobar', order: 0, byPlayers: [0]}]);
                    });
                });

                it('the first element must not be a number', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo([123,{containerId: 'foobar', order: 0, byPlayers: [0]}]);
                    });
                });

                it('the first element must not be an empty object', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo([{},{containerId: 'foobar', order: 0, byPlayers: [0]}]);
                    });
                });

                it('the second element must not be a string', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0]},'foobar']);
                    });
                });

                it('the second element must not be a number', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0]},123]);
                    });
                });

                it('the second element must not be an empty object', function() {
                    assert.throws(function() {
                        c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0]},{}]);
                    });
                });

                describe('containerId', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{order: 0, byPlayers: [0]}]);
                        });
                    });
                    it('should be a string', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: null, order: 0, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: true, order: 0, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 1, order: 0, byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0]}]);
                        });
                    });
                });

                describe('order', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', byPlayers: [0]}]);
                        });
                    });
                    it('should be an integer', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: null, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: true, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 'foobar', byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 1.234, byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 5, byPlayers: [0]}]);
                        });
                        assert.doesNotThrow(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: -3, byPlayers: [0]}]);
                        });
                    });
                });

                describe('byPlayers', function() {
                    it('should be defined', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0}]);
                        });
                    });

                    it('should be an array', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: null}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: true}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: 'foobar'}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: '123'}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: {foo: 'bar'}}]);
                        });
                        assert.doesNotThrow(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0,1]}]);
                        });
                    });
                    it('should have only numbers', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0, 1, 2, 'foo']}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0, 1, null, 3]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0, true, 2, 3]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [1.234, 1, 2, 3]}]);
                        });
                        assert.doesNotThrow(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [0, 1, 2, 3]}]);
                        });
                    });
                    it('should have unique numbers greater equal than 0', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [-1, 1, 2, 3]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [-1, -1, 2, 3]}]);
                        });
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [1, 2, 2, 3]}]);
                        });
                        assert.doesNotThrow(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: [1, 2, 3, 4]}]);
                        });
                    });
                    it('must not be empty', function () {
                        assert.throws(function() {
                            c.setCanBeAttachedTo([{containerId: 'foobar', order: 0, byPlayers: []}]);
                        });
                    });
                });

                it('should not accept more than 10000 items', function() {
                    let items = [];
                    for (let i = 0; i < 10001; i++) {
                        items.push({containerId: 'foobar', order: i, byPlayers: [0]});
                    }
                    assert.throws(function() {
                        c.setCanBeAttachedTo(items);
                    });

                    items.splice(0,1);
                    assert.doesNotThrow(function() {
                        c.setCanBeAttachedTo(items);
                    });
                });

                it('should accept a correct list of items', function() {
                    assert.doesNotThrow(function() {
                        c.setCanBeAttachedTo([
                            {containerId: 'foobar', order: 0, byPlayers: [1, 2, 3, 4]},
                            {containerId: 'foobar', order: 1, byPlayers: [1, 2, 3, 4]},
                            {containerId: 'foobar', order: 2, byPlayers: [1, 2, 3, 4]}
                        ]);
                    });
                });
            });
            
            describe('transformToFrontend', function() {
                it('must transform {order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []} correctly', function() {
                    let c = new Card({order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: []});

                    assert.deepEqual(c.transformToFrontend(0), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(c.transformToFrontend(1), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(c.transformToFrontend(2), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                });
                it('must transform {order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [1,2], clickableFor: [], canBeAttachedTo: []} correctly', function() {
                    let c = new Card({order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [1,2], clickableFor: [], canBeAttachedTo: []});

                    assert.deepEqual(c.transformToFrontend(0), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(c.transformToFrontend(1), {order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(c.transformToFrontend(2), {order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                });
                it('must transform {order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [0,2], canBeAttachedTo: []} correctly', function() {
                    let c = new Card({order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [0,2], canBeAttachedTo: []});

                    assert.deepEqual(c.transformToFrontend(0), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: true, canBeAttachedTo: []});
                    assert.deepEqual(c.transformToFrontend(1), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: []});
                    assert.deepEqual(c.transformToFrontend(2), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: true, canBeAttachedTo: []});
                });
                it('must transform {order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: [{containerId: "foobar", order: 1, byPlayers: [0,1]},{containerId: "foobar", order: 2, byPlayers: [2]},{containerId: "bat", order: 1, byPlayers: [2]}]} correctly', function() {
                    let c = new Card({order: 0, frontImage: "a", backImage: "b", side: "front", rotation: 0, frontVisibleFor: [], clickableFor: [], canBeAttachedTo: [{containerId: "foobar", order: 1, byPlayers: [0,1]},{containerId: "foobar", order: 2, byPlayers: [2]},{containerId: "bat", order: 1, byPlayers: [2]}]});

                    assert.deepEqual(c.transformToFrontend(0), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: [{containerId: 'foobar', order: 1}]});
                    assert.deepEqual(c.transformToFrontend(1), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: [{containerId: 'foobar', order: 1}]});
                    assert.deepEqual(c.transformToFrontend(2), {order: 0, frontImage: null, backImage: "b", side: "front", rotation: 0, clickable: false, canBeAttachedTo: [{containerId: 'foobar', order: 2},{containerId: 'bat', order: 1}]});
                });
            });
        });
    });
});