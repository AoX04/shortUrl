
const JsonError = require('./JsonError');

class NotFoundError extends JsonError {
    /**
     * @param {String} message Error message
     * @param {Number} errorCode Custom error code
     */
    constructor(message, errorCode = 0) {
        super(message, 404, errorCode);
    }
}

module.exports = NotFoundError;
