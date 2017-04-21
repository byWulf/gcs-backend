'use strict';

module.exports = EventError;

function EventError(errorKey, data) {
    this.key = errorKey;
    this.data = data;
}
EventError.prototype = Object.create(Error.prototype);
EventError.prototype.constructor = EventError;