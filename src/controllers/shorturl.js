const shorturlService = require ('../services/shorturl')
/**
 * @param {Req} req
 * @returns {Promise<{General}>}
 */
async function shorturl(req) {
    const url = await shorturlService.newEntry(req.body.url, req.state)
    return {
        url,
    };
}

exports.shorturl = shorturl;
