'use strict';

module.exports = EventError;

function EventError(errorKey) {
    this.key = errorKey;
}
EventError.prototype = Object.create(Error.prototype);
EventError.prototype.constructor = EventError;