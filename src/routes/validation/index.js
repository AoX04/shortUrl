const joi = require('joi');

const shorturl = joi.object().keys({
    body: joi.object().keys({
        url: joi.string().required(),
    }).required(),
});

module.exports = {
    shorturl,
};
