const _ = require('lodash');
const joi = require('joi');
const errors = require('../errors');
const config = require('../config');

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
        return next(errors.newErrors.badRequest(_.get(result, 'error.message')));
    }
    return next();
};

exports.errorHandler = (err, req, res, next) => {
    let { statusCode } = err;
    console.log(err);
    /* istanbul ignore next */
    if (!_.isNumber(statusCode)) {
        statusCode = 500;
    }
    res.status(statusCode);

    /*
    if (statusCode >= 500) {
        req.state.logger.error({ err, req, res }, 'Error handler at the end of app');
    } else {
        req.state.logger.warn({ err, req, res }, 'Warn handler at the end of app');
    }
    */

    const errOutput = _.pick(err, ['errorCode', 'statusCode', 'message', 'name']);

    console.log('errOutput', errOutput);
    const errResponse = {
        'odata.error': {
            code: 10166,
            message: {
                lang: 'en-US',
                value: errOutput.message,
            },
        },
    };
    /* istanbul ignore if */
    if (config.params.sendErrorStackTrace) {
        errResponse.stack = _.get(err, 'stack');
    }

    // for any response that is application/json
    res.json(errResponse);
};

exports.handleController = fn => async (req, res, next) => {
    try {
        req.state.out = await fn(req, res);
        return next();
    } catch (ex) {
        return next(ex);
    }
};

exports.standardHandler = (req, res) => {
    if (_.has(req, 'state.out')) { // If this if-statemement does not suit your app, feel free to remove it
        req.state.logger.info({ req, res, out: _.get(req, 'state.out') }, 'Standard output');
        return res.json(req.state.out);
    }

    res.status(404);
    req.state.logger.info({ req, res }, 'Standard output 404');
    return res.json(errors.newErrors.notfound());
};
