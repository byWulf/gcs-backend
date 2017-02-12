'use strict';

module.exports = SplittedContainer;

function SplittedContainer(data) {
    let rows = [1];
    let columns = [1];
    
    this.setRows = function(newRows) {
        if (typeof newRows === 'undefined') throw new Error('SplittetContainer_v1 must define "rows".');
        if (!(newRows instanceof Array)) throw new Error('SplittetContainer_v1.rows must be an array.');

        if (newRows.length > 100) throw new Error('SplittetContainer_v1.rows must have at most 100 entries.');
        for (let i = 0; i < newRows.length; i++) {
            if (typeof newRows[i] !== 'number') throw new Error('SplittetContainer_v1.rows must contain only numbers.');
            if (newRows[i] <= 0 || newRows[i] > 1) throw new Error('SplittetContainer_v1.rows must only have values greater 0 and lower or equal 1.');
        }
        if (newRows.reduce(function(a, b) { return a + b; }, 0).toFixed(4) !== '1.0000') throw new Error('SplittetContainer_v1.rows elements must be in sum exactly 1.');
        
        rows = newRows;
    };
    
    this.setColumns = function(newColumns) {
        if (typeof newColumns === 'undefined') throw new Error('SplittetContainer_v1 must define "columns".');
        if (!(newColumns instanceof Array)) throw new Error('SplittetContainer_v1.columns must be an array.');

        if (newColumns.length > 100) throw new Error('SplittetContainer_v1.columns must have at most 100 entries.');
        for (let i = 0; i < newColumns.length; i++) {
            if (typeof newColumns[i] !== 'number') throw new Error('SplittetContainer_v1.columns must contain only numbers.');
            if (newColumns[i] <= 0 || newColumns[i] > 1) throw new Error('SplittetContainer_v1.columns must only have values greater 0 and lower or equal 1.');
        }
        if (newColumns.reduce(function(a, b) { return a + b; }, 0).toFixed(4) !== '1.0000') throw new Error('SplittetContainer_v1.columns elements must be in sum exactly 1.');
        
        columns = newColumns;
    };

    this.transformToFrontend = function() {
        return {
            rows: rows,
            columns: columns
        };
    };

    this.setRows(data.rows);
    this.setColumns(data.columns);
}