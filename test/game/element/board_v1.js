'use strict';

const assert    = require('chai').assert;
const Board = require(__dirname + '/../../../lib/game/element/board_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('board_v1', function() {
            it('should instantiate without error', function() {
                let b = new Board({image: 'images/foobar.png'});
                assert.instanceOf(b, Board);
            });
            describe('setImage', function() {
                let b = new Board({image: 'images/foobar.png'});

                it('must be defined', function() {
                    assert.throws(function() {
                        b.setImage();
                    });
                });
                it('must not be a number', function() {
                    assert.throws(function() {
                        b.setImage(123);
                    });
                });
                it('must not be empty', function() {
                    assert.throws(function() {
                        b.setImage('');
                    });
                });
                it('must be a string', function() {
                    assert.doesNotThrow(function() {
                        b.setImage('images/someimage.jpg');
                    });
                });
            });
            describe('transformToFrontend', function() {
                it('must transform {image: "images/foobar.png"} correctly', function() {
                    let b = new Board({image: 'images/foobar.png'});

                    assert.deepEqual(b.transformToFrontend(0), {image: 'images/foobar.png'});
                });
                it('must transform {image: "images/subfolder/someotherimage.jpg"} correctly', function() {
                    let b = new Board({image: "images/subfolder/someotherimage.jpg"});

                    assert.deepEqual(b.transformToFrontend(0), {image: "images/subfolder/someotherimage.jpg"});
                });
            });
        });
    });
});