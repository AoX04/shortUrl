/**
 * Standard json error with possibility to add response code
 * @property {string} name Name of it
 * @extends Error
 */
class JsonError extends Error {
    /**
     * name: string;
     * message: string;
     * status: number;
     * errorCode: number;
     * statusCode: number; // important for Restify
     *
     * @param {string} message Error message
     * @param {number} status Status code for http response
     * @param {number} errorCode Custom error code-
     *      for i.e. mobile app error handling (like email is already taken)
     */
    constructor(message, status, errorCode = 0) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.errorCode = errorCode;
        this.statusCode = status; // important for Restify
    }
}

module.exports = JsonError;
