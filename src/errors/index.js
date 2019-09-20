const BadRequestError = require('./classes/BadRequestError');

const newErrors = {
    /* istanbul ignore next */
    badRequest(message = 'Bad Request', code = null) {
        return new BadRequestError(message, code);
    },
};

exports.newErrors = newErrors;

/* istanbul ignore next */
exports.user = {
};
