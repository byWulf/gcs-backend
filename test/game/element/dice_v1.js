'use strict';

const assert    = require('chai').assert;
const Dice = require(__dirname + '/../../../lib/game/element/dice_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('dice_v1', function() {
            it('should instantiate without error', function() {
                let d = new Dice({form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 0, canBeRolledBy: [0]});
                assert.instanceOf(d, Dice);
            });
            describe('setForm', function() {
                let d = new Dice({form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 0, canBeRolledBy: [0]});
                
                it('must be defined', function() {
                    assert.throws(function() {
                        d.setForm();
                    });
                });

                it('should be a string', function () {
                    assert.throws(function() {
                        d.setForm(null);
                    });
                    assert.throws(function() {
                        d.setForm(1234);
                    });
                    assert.throws(function() {
                        d.setForm({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('cube');
                    });
                });

                it('should allow only specific values', function () {
                    assert.throws(function() {
                        d.setForm('foobar');
                    });
                    assert.throws(function() {
                        d.setForm('hello');
                    });
                    assert.throws(function() {
                        d.setForm('test');
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('coin');
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('tetrahedron');
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('cube');
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('octahedron');
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('pentagonal trapezohedron');
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('dodecahedron');
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('icosahedron');
                    });
                });
            });
            describe('sides', function() {
                let d = new Dice({form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 0, canBeRolledBy: [0]});
                it('must be defined', function () {
                    assert.throws(function() {
                        d.setSides();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        d.setSides('abcdef');
                    });
                    assert.throws(function() {
                        d.setSides(6);
                    });
                    assert.throws(function() {
                        d.setSides(false);
                    });
                    assert.doesNotThrow(function() {
                        d.setSides(['a', 'b', 'c', 'd', 'e', 'f']);
                    });
                });
                it('should have only string elements', function () {
                    assert.throws(function() {
                        d.setSides(['a', 'b', 3, 'd', 'e', 'f']);
                    });
                    assert.throws(function() {
                        d.setSides(['a', 'b', 'c', 'd', 'e', true]);
                    });
                    assert.throws(function() {
                        d.setSides(['a', 'b', 'c', 'd', {e: 'e'}, 'f']);
                    });
                    assert.throws(function() {
                        d.setSides([null, 'b', 'c', 'd', 'e', 'f']);
                    });
                    assert.doesNotThrow(function() {
                        d.setSides(['a', 'b', 'c', 'd', 'e', 'f']);
                    });
                });
                it('should have 2 elements when form is "coin"', function () {
                    assert.throws(function() {
                        d.setForm('coin');
                        d.setSides(['a', 'b', 'c']);
                    });
                    assert.throws(function() {
                        d.setForm('coin');
                        d.setSides(['a']);
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('coin');
                        d.setSides(['a','b']);
                    });
                });
                it('should have 4 elements when form is "tetrahedron"', function () {
                    assert.throws(function() {
                        d.setForm('tetrahedron');
                        d.setSides(['a', 'b', 'c','d','e']);
                    });
                    assert.throws(function() {
                        d.setForm('tetrahedron');
                        d.setSides(['a','b','c']);
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('tetrahedron');
                        d.setSides(['a','b','c','d']);
                    });
                });
                it('should have 6 elements when form is "cube"', function () {
                    assert.throws(function() {
                        d.setForm('cube');
                        d.setSides(['a', 'b', 'c','d','e','f','g']);
                    });
                    assert.throws(function() {
                        d.setForm('cube');
                        d.setSides(['a','b','c','d','e']);
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('cube');
                        d.setSides(['a','b','c','d','e','f']);
                    });
                });
                it('should have 8 elements when form is "octahedron"', function () {
                    assert.throws(function() {
                        d.setForm('octahedron');
                        d.setSides(['a', 'b', 'c','d','e','f','g','h','i']);
                    });
                    assert.throws(function() {
                        d.setForm('octahedron');
                        d.setSides(['a','b','c','d','e','f','g']);
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('octahedron');
                        d.setSides(['a','b','c','d','e','f','g','h']);
                    });
                });
                it('should have 10 elements when form is "pentagonal trapezohedron"', function () {
                    assert.throws(function() {
                        d.setForm('pentagonal trapezohedron');
                        d.setSides(['a', 'b', 'c','d','e','f','g','h','i','j','k']);
                    });
                    assert.throws(function() {
                        d.setForm('pentagonal trapezohedron');
                        d.setSides(['a','b','c','d','e','f','g','h','i']);
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('pentagonal trapezohedron');
                        d.setSides(['a','b','c','d','e','f','g','h','i','j']);
                    });
                });
                it('should have 12 elements when form is "dodecahedron"', function () {
                    assert.throws(function() {
                        d.setForm('dodecahedron');
                        d.setSides(['a', 'b', 'c','d','e','f','g','h','i','j','k','l','m']);
                    });
                    assert.throws(function() {
                        d.setForm('dodecahedron');
                        d.setSides(['a','b','c','d','e','f','g','h','i','j','k']);
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('dodecahedron');
                        d.setSides(['a','b','c','d','e','f','g','h','i','j','k','l']);
                    });
                });
                it('should have 20 elements when form is "icosahedron"', function () {
                    assert.throws(function() {
                        d.setForm('icosahedron');
                        d.setSides(['a', 'b', 'c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u']);
                    });
                    assert.throws(function() {
                        d.setForm('icosahedron');
                        d.setSides(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s']);
                    });
                    assert.doesNotThrow(function() {
                        d.setForm('icosahedron');
                        d.setSides(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t']);
                    });
                });
            });
            describe('sideUp', function() {
                let d = new Dice({form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 0, canBeRolledBy: [0]});

                it('should be defined', function () {
                    assert.throws(function() {
                        d.setSideUp();
                    });
                });
                it('should be a number', function () {
                    assert.throws(function() {
                        d.setSideUp(null);
                    });
                    assert.throws(function() {
                        d.setSideUp('foobar');
                    });
                    assert.throws(function() {
                        d.setSideUp(true);
                    });
                    assert.doesNotThrow(function() {
                        d.setSideUp(0);
                    });
                });
                it('should be a number between 0 and 1 when form is "coin"', function () {
                    d.setForm('coin');
                    
                    for (let i = -3; i <= 3; i++) {
                        if (i < 0 || i > 1) {
                            assert.throws(function() {
                                d.setSideUp(i);
                            });
                        } else {
                            assert.doesNotThrow(function() {
                                d.setSideUp(i);
                            });
                        }
                    }
                });
                it('should be a number between 0 and 3 when form is "tetrahedron"', function () {
                    d.setForm('tetrahedron');
                    
                    for (let i = -3; i <= 6; i++) {
                        if (i < 0 || i > 3) {
                            assert.throws(function() {
                                d.setSideUp(i);
                            });
                        } else {
                            assert.doesNotThrow(function() {
                                d.setSideUp(i);
                            });
                        }
                    }
                });
                it('should be a number between 0 and 5 when form is "cube"', function () {
                    d.setForm('cube');
                    
                    for (let i = -3; i <= 8; i++) {
                        if (i < 0 || i > 5) {
                            assert.throws(function() {
                                d.setSideUp(i);
                            });
                        } else {
                            assert.doesNotThrow(function() {
                                d.setSideUp(i);
                            });
                        }
                    }
                });
                it('should be a number between 0 and 7 when form is "octahedron"', function () {
                    d.setForm('octahedron');
                    
                    for (let i = -3; i <= 10; i++) {
                        if (i < 0 || i > 7) {
                            assert.throws(function() {
                                d.setSideUp(i);
                            });
                        } else {
                            assert.doesNotThrow(function() {
                                d.setSideUp(i);
                            });
                        }
                    }
                });
                it('should be a number between 0 and 9 when form is "pentagonal trapezohedron"', function () {
                    d.setForm('pentagonal trapezohedron');
                    
                    for (let i = -3; i <= 12; i++) {
                        if (i < 0 || i > 9) {
                            assert.throws(function() {
                                d.setSideUp(i);
                            });
                        } else {
                            assert.doesNotThrow(function() {
                                d.setSideUp(i);
                            });
                        }
                    }
                });
                it('should be a number between 0 and 11 when form is "dodecahedron"', function () {
                    d.setForm('dodecahedron');
                    
                    for (let i = -3; i <= 14; i++) {
                        if (i < 0 || i > 11) {
                            assert.throws(function() {
                                d.setSideUp(i);
                            });
                        } else {
                            assert.doesNotThrow(function() {
                                d.setSideUp(i);
                            });
                        }
                    }
                });
                it('should be a number between 0 and 19 when form is "icosahedron"', function () {
                    d.setForm('icosahedron');
                    
                    for (let i = -3; i <= 22; i++) {
                        if (i < 0 || i > 19) {
                            assert.throws(function() {
                                d.setSideUp(i);
                            });
                        } else {
                            assert.doesNotThrow(function() {
                                d.setSideUp(i);
                            });
                        }
                    }
                });
            });
            describe('canBeRolledBy', function() {
                let d = new Dice({form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 0, canBeRolledBy: [0]});

                it('should be defined', function () {
                    assert.throws(function() {
                        d.setCanBeRolledBy();
                    });
                });
                it('should be an array', function () {
                    assert.throws(function() {
                        d.setCanBeRolledBy(null);
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy(true);
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy('foobar');
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy('123');
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy({foo: 'bar'});
                    });
                    assert.doesNotThrow(function() {
                        d.setCanBeRolledBy([0,1]);
                    });
                });
                it('should have only numbers', function () {
                    assert.throws(function() {
                        d.setCanBeRolledBy([0, 1, 2, 'foo']);
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy([0, 1, null, 3]);
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy([0, true, 2, 3]);
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy([1.234, 1, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        d.setCanBeRolledBy([0, 1, 2, 3]);
                    });
                });
                it('should have unique numbers greater equal than 0', function () {
                    assert.throws(function() {
                        d.setCanBeRolledBy([-1, 1, 2, 3]);
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy([-1, -1, 2, 3]);
                    });
                    assert.throws(function() {
                        d.setCanBeRolledBy([1, 2, 2, 3]);
                    });
                    assert.doesNotThrow(function() {
                        d.setCanBeRolledBy([1, 2, 3, 4]);
                    });
                });
                it('may be empty', function () {
                    assert.doesNotThrow(function() {
                        d.setCanBeRolledBy([]);
                    });
                });
            });
            
            describe('transformToFrontend', function() {
                it('must transform {form: "cube", sides: ["a","b","c","d","e","f"], sideUp: 5, canBeRolledBy: [0]} correctly', function() {
                    let d = new Dice({form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 5, canBeRolledBy: [0]});

                    assert.deepEqual(d.transformToFrontend(0), {form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 5, canBeRolled: true});
                    assert.deepEqual(d.transformToFrontend(1), {form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 5, canBeRolled: false});
                    assert.deepEqual(d.transformToFrontend(2), {form: 'cube', sides: ['a','b','c','d','e','f'], sideUp: 5, canBeRolled: false});
                });
                it('must transform {form: "coin", sides: ["a","b"], sideUp: 0, canBeRolledBy: [0,1,3]} correctly', function() {
                    let d = new Dice({form: "coin", sides: ["a","b"], sideUp: 0, canBeRolledBy: [0,1,3]});

                    assert.deepEqual(d.transformToFrontend(0), {form: "coin", sides: ["a","b"], sideUp: 0, canBeRolled: true});
                    assert.deepEqual(d.transformToFrontend(1), {form: "coin", sides: ["a","b"], sideUp: 0, canBeRolled: true});
                    assert.deepEqual(d.transformToFrontend(2), {form: "coin", sides: ["a","b"], sideUp: 0, canBeRolled: false});
                    assert.deepEqual(d.transformToFrontend(3), {form: "coin", sides: ["a","b"], sideUp: 0, canBeRolled: true});
                });
            });
        });
    });
});