const _ = require('lodash');
const joi = require('joi');

/**
 * Middleware responsible for the sending the response and handling the errors
 * @param fn Function that will be executed and awaited and its value put as response
 */
exports.handleController = fn => async (req, res, next) => {
    try {
        req.state.out = await fn(req, res);
        return next();
    } catch (ex) {
        return next(ex);
    }
};

exports.validateReqParams = (schema, allowUnknown = true) => async (req, res, next) => {
    const result = joi.validate(req, schema, { allowUnknown });
    if (_.isObject(result.error)) {
        return next(new Error({
            name:_.get(result, 'error.message'),
            reason: "BadRequest",
            code: 400, 
        }))
    }
    return next();
};
