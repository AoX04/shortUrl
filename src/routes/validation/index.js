const joi = require('joi');

const shorturl = joi.object().keys({
    body: joi.object().keys({
    }).required(),
});

module.exports = {
    shorturl,
};
