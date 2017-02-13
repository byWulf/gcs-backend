'use strict';

const assert    = require('chai').assert;
const Object = require(__dirname + '/../../../lib/game/element/object_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('object_v1', function() {
            it('should instantiate without error', function() {
                let o = new Object({size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});
                assert.instanceOf(o, Object);
            });
            
            describe('size', function() {
                let o = new Object({size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});

                it('must be defined', function() {
                    assert.throws(function() {
                        o.setSize();
                    });
                });
                it('should be a positive number', function () {
                    assert.throws(function() {
                        o.setSize(null);
                    });
                    assert.throws(function() {
                        o.setSize(false);
                    });
                    assert.throws(function() {
                        o.setSize(true);
                    });
                    assert.throws(function() {
                        o.setSize('foobar');
                    });
                    assert.doesNotThrow(function() {
                        o.setSize(1.23);
                    });
                    assert.throws(function() {
                        o.setSize([1,2,3]);
                    });
                    assert.throws(function() {
                        o.setSize({foo: 'bar'});
                    });
                    assert.throws(function() {
                        o.setSize(0);
                    });
                    assert.throws(function() {
                        o.setSize(-360);
                    });
                    assert.doesNotThrow(function() {
                        o.setSize(1);
                    });
                    assert.doesNotThrow(function() {
                        o.setSize(360);
                    });
                    assert.doesNotThrow(function() {
                        o.setSize(359.99);
                    });
                });
            });
            
            describe('x', function() {
                let o = new Object({size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});

                it('must be defined', function() {
                    assert.throws(function() {
                        o.setX();
                    });
                });
                it('should be a positive number', function () {
                    assert.throws(function() {
                        o.setX(null);
                    });
                    assert.throws(function() {
                        o.setX(false);
                    });
                    assert.throws(function() {
                        o.setX(true);
                    });
                    assert.throws(function() {
                        o.setX('foobar');
                    });
                    assert.doesNotThrow(function() {
                        o.setX(1.23);
                    });
                    assert.throws(function() {
                        o.setX([1,2,3]);
                    });
                    assert.throws(function() {
                        o.setX({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        o.setX(0);
                    });
                    assert.doesNotThrow(function() {
                        o.setX(-360);
                    });
                    assert.doesNotThrow(function() {
                        o.setX(-1.23);
                    });
                    assert.doesNotThrow(function() {
                        o.setX(1);
                    });
                    assert.doesNotThrow(function() {
                        o.setX(360);
                    });
                    assert.doesNotThrow(function() {
                        o.setX(359.99);
                    });
                });
            });
            
            describe('y', function() {
                let o = new Object({size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});

                it('must be defined', function() {
                    assert.throws(function() {
                        o.setY();
                    });
                });
                it('should be a positive number', function () {
                    assert.throws(function() {
                        o.setY(null);
                    });
                    assert.throws(function() {
                        o.setY(false);
                    });
                    assert.throws(function() {
                        o.setY(true);
                    });
                    assert.throws(function() {
                        o.setY('foobar');
                    });
                    assert.doesNotThrow(function() {
                        o.setY(1.23);
                    });
                    assert.throws(function() {
                        o.setY([1,2,3]);
                    });
                    assert.throws(function() {
                        o.setY({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        o.setY(0);
                    });
                    assert.doesNotThrow(function() {
                        o.setY(-360);
                    });
                    assert.doesNotThrow(function() {
                        o.setY(-1.23);
                    });
                    assert.doesNotThrow(function() {
                        o.setY(1);
                    });
                    assert.doesNotThrow(function() {
                        o.setY(360);
                    });
                    assert.doesNotThrow(function() {
                        o.setY(359.99);
                    });
                });
            });
            
            describe('rotation', function() {
                let o = new Object({size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});

                it('must be defined', function() {
                    assert.throws(function() {
                        o.setRotation();
                    });
                });
                it('should be a number greater equal than 0 and less than 360', function () {
                    assert.throws(function() {
                        o.setRotation(null);
                    });
                    assert.throws(function() {
                        o.setRotation(false);
                    });
                    assert.throws(function() {
                        o.setRotation(true);
                    });
                    assert.throws(function() {
                        o.setRotation('foobar');
                    });
                    assert.doesNotThrow(function() {
                        o.setRotation(1.23);
                    });
                    assert.throws(function() {
                        o.setRotation([1,2,3]);
                    });
                    assert.throws(function() {
                        o.setRotation({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        o.setRotation(0);
                    });
                    assert.throws(function() {
                        o.setRotation(-360);
                    });
                    assert.doesNotThrow(function() {
                        o.setRotation(1);
                    });
                    assert.throws(function() {
                        o.setRotation(360);
                    });
                    assert.doesNotThrow(function() {
                        o.setRotation(359.99);
                    });
                });
            });
            
            describe('image', function() {
                let o = new Object({size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});

                it('must be defined', function() {
                    assert.throws(function() {
                        o.setImage();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        o.setImage(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        o.setImage('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        o.setImage('images/someimage.png');
                    });
                });
            });
            
            describe('model', function() {
                let o = new Object({size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});

                it('must be defined', function() {
                    assert.throws(function() {
                        o.setModel();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        o.setModel(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        o.setModel('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        o.setModel('models/somemodel.obj');
                    });
                });
            });

            describe('transformToFrontend', function() {
                it('must transform {size: 1, x: 0, y: 0, rotation: 0, image: "image/foobar.png", model: "models/foobar.obj"} correctly', function() {
                    let o = new Object({size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});

                    assert.deepEqual(o.transformToFrontend(0), {size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});
                    assert.deepEqual(o.transformToFrontend(1), {size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});
                    assert.deepEqual(o.transformToFrontend(2), {size: 1, x: 0, y: 0, rotation: 0, image: 'image/foobar.png', model: 'models/foobar.obj'});
                });
            });
        });
    });
});