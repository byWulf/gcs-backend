'use strict';

const assert    = require('chai').assert;
const SplittetContainer = require(__dirname + '/../../../lib/game/element/splittedContainer_v1.js');

describe('game', function() {
    describe('element', function() {
        describe('splittetContainer_v1', function() {
            it('should instantiate without error', function() {
                let sc = new SplittetContainer({rows: [1], columns: [1]});
                assert.instanceOf(sc, SplittetContainer);
            });
            describe('setRows', function() {
                let sc = new SplittetContainer({rows: [1], columns: [1]});

                it('must be defined', function() {
                    assert.throws(function() {
                        sc.setRows();
                    });
                });

                it('must not be a string', function() {
                    assert.throws(function() {
                        sc.setRows('foobar');
                    });
                });

                it('must not be a number', function() {
                    assert.throws(function() {
                        sc.setRows(0.5);
                    });
                });

                it('must contain at least one element', function() {
                    assert.throws(function() {
                        sc.setRows([]);
                    });
                });

                it('must not contain strings', function() {
                    assert.throws(function() {
                        sc.setRows(['foobar', 1]);
                    });
                });

                it('must not contain 0', function() {
                    assert.throws(function() {
                        sc.setRows([0, 1]);
                    });
                });

                it('must not contain negative values', function() {
                    assert.throws(function() {
                        sc.setRows([-1, 1, 1]);
                    });
                });

                it('must not contain values bigger 1', function() {
                    assert.throws(function() {
                        sc.setRows([2]);
                    });
                });

                it('must be in sum exactly 1 (too low)', function() {
                    assert.throws(function() {
                        sc.setRows([0.1, 0.2]);
                    });
                });

                it('must be in sum exactly 1 (too hight)', function() {
                    assert.throws(function() {
                        sc.setRows([0.1, 0.2, 0.3, 0.4, 0.5]);
                    });
                });

                it('must not allow more than 100 rows', function() {
                    let rows = [];
                    for (let i = 0; i < 101; i++) {
                        rows.push(1/101);
                    }
                    assert.throws(function() {
                        sc.setRows(rows);
                    });
                    
                    rows = [];
                    for (let i = 0; i < 100; i++) {
                        rows.push(1/100);
                    }
                    assert.doesNotThrow(function() {
                        sc.setRows(rows);
                    });
                });

                it('must be correct with three elements', function() {
                    assert.doesNotThrow(function() {
                        sc.setRows([0.5, 0.2, 0.3]);
                    });
                });

                it('must be correct with one element', function() {
                    assert.doesNotThrow(function() {
                        sc.setRows([1]);
                    });
                });
            });
            describe('setColumns', function() {
                let sc = new SplittetContainer({rows: [1], columns: [1]});

                it('must be defined', function() {
                    assert.throws(function() {
                        sc.setColumns();
                    });
                });

                it('must not be a string', function() {
                    assert.throws(function() {
                        sc.setColumns('foobar');
                    });
                });

                it('must not be a number', function() {
                    assert.throws(function() {
                        sc.setColumns(0.5);
                    });
                });

                it('must contain at least one element', function() {
                    assert.throws(function() {
                        sc.setColumns([]);
                    });
                });

                it('must not contain strings', function() {
                    assert.throws(function() {
                        sc.setColumns(['foobar', 1]);
                    });
                });

                it('must not contain 0', function() {
                    assert.throws(function() {
                        sc.setColumns([0, 1]);
                    });
                });

                it('must not contain negative values', function() {
                    assert.throws(function() {
                        sc.setColumns([-1, 1, 1]);
                    });
                });

                it('must not contain values bigger 1', function() {
                    assert.throws(function() {
                        sc.setColumns([2]);
                    });
                });

                it('must be in sum exactly 1 (too low)', function() {
                    assert.throws(function() {
                        sc.setColumns([0.1, 0.2]);
                    });
                });

                it('must be in sum exactly 1 (too hight)', function() {
                    assert.throws(function() {
                        sc.setColumns([0.1, 0.2, 0.3, 0.4, 0.5]);
                    });
                });

                it('must not allow more than 100 columns', function() {
                    let columns = [];
                    for (let i = 0; i < 101; i++) {
                        columns.push(1/101);
                    }
                    assert.throws(function() {
                        sc.setColumns(columns);
                    });
                    
                    columns = [];
                    for (let i = 0; i < 100; i++) {
                        columns.push(1/100);
                    }
                    assert.doesNotThrow(function() {
                        sc.setColumns(columns);
                    });
                });

                it('must be correct with three elements', function() {
                    assert.doesNotThrow(function() {
                        sc.setColumns([0.5, 0.2, 0.3]);
                    });
                });

                it('must be correct with one element', function() {
                    assert.doesNotThrow(function() {
                        sc.setColumns([1]);
                    });
                });
            });
            describe('transformToFrontend', function() {
                it('must transform {rows: [1], columns: [1]} correctly', function() {
                    let sc = new SplittetContainer({rows: [1], columns: [1]});

                    assert.deepEqual(sc.transformToFrontend(0), {rows: [1], columns: [1]});
                });
                it('must transform {rows: [0.1, 0.2, 0.3, 0.4], columns: [0.5, 0.5]} correctly', function() {
                    let sc = new SplittetContainer({rows: [0.1, 0.2, 0.3, 0.4], columns: [0.5, 0.5]});

                    assert.deepEqual(sc.transformToFrontend(0), {rows: [0.1, 0.2, 0.3, 0.4], columns: [0.5, 0.5]});
                });
            });
        });
    });
});