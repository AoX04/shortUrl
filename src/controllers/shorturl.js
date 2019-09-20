const shorturlService = require('../services/shorturl');
/**
 * @param {Req} req
 * @returns {Promise<{General}>}
 */
async function shorturl(req) {
    const url = await shorturlService.newEntry(req.body.url, req.state);
    return {
        url,
    };
}

async function top100(req) {
    return {
        top100: await shorturlService.top100(req.state),
    };
}

async function redirect(req) {
    // Due to the cascading of express
    // if a previous controller have been called we default to them
    if (req.state.out) return req.state.out;

    const url = await shorturlService.redirect(req.params.redirectId, req.state);

    return {
        url,
    };
}

module.exports = {
    shorturl,
    redirect,
    top100,
};
