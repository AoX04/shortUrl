const JsonError = require('./JsonError');

class BadRequestError extends JsonError {
    /**
     * @param {String} message Error message
     * @param {Number} errorCode Custom error code
     */
    constructor(message, errorCode = 0) {
        super(message, 400, errorCode);
    }
}

module.exports = BadRequestError;
