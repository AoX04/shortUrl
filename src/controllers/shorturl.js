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

async function top100(req){
    const top100 = await shorturlService.top100(req.state);
    return {
        top100,
    };
}

async function redirect(req) {
    const url = await shorturlService.redirect(req.params.redirectId, req.state);
    
    if(req.state.out) return req.state.out;
    return {
        url,
    };
}

module.exports = {
    shorturl,
    redirect,
    top100,
}
