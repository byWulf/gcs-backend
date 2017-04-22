'use strict';

const monk = require('monk');

function DatabaseCommunicator() {
    this.db = monk('localhost/gcs');

    this.find = function(collectionName, query, options) {
        return this.db.get(collectionName).find(query, options);
    };

    this.findOne = function(collectionName, query, options) {
        return this.db.get(collectionName).findOne(query, options);
    };
    
    this.insert = function(collectionName, document) {
        return this.db.get(collectionName).insert(document);
    };
    
    this.update = function(collectionName, documentToUpdate, updateData) {
        return this.db.get(collectionName).update(documentToUpdate, updateData);
    };
    
    this.remove = function(collectionName, document) {
        return this.db.get(collectionName).remove(document);
    };
}

module.exports = new DatabaseCommunicator();