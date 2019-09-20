const joi = require('joi');

const shorturl = joi.object().keys({
    body: joi.object().keys({
        url: joi.string().required(),
    }).required(),
});

const redirect = joi.object().keys({
    params: joi.object().keys({
        redirectId: joi.string().required(),
    }).required(),
});

module.exports = {
    shorturl,
    redirect,
};
