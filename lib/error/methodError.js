'use strict';

module.exports = MethodError;

function MethodError(errorKey) {
    this.key = errorKey;
}
MethodError.prototype = Object.create(Error.prototype);
MethodError.prototype.constructor = MethodError;