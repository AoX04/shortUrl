const BadRequestError = require('./classes/BadRequestError');
const NotFoundError = require('./classes/NotFoundError');

const newErrors = {
    /* istanbul ignore next */
    badRequest(message = 'Bad Request', code = null) {
        return new BadRequestError(message, code);
    },
    notfound(message = 'Not Found', code = null) {
        return new NotFoundError(message, code);
    },
};

exports.newErrors = newErrors;

/* istanbul ignore next */
exports.user = {
};
