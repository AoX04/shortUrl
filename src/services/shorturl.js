
const shorturlModel = require('../repositories/shorturl');
const errors = require('../errors');

/**
 * @param {Req} req
 * @returns {Promise<{General}>}
 */

async function asyncIncreaseHit(entry, state) {
    try {
        return await entry.update({ $inc: { hits: 1 } });
    } catch (err) {
        state.logger.error({
            entry,
            asyncIncreaseHitError: err,
        }, 'Error while processing entry in asyncIncreaseHit');
        return null;
    }
}

async function redirect(id, state) {
    try {
        const parsedId = parseInt(id, 36);
        const entry = await shorturlModel.findById(parsedId);
        if (!entry) return null;

        asyncIncreaseHit(entry, state);

        return entry.url;
    } catch (err) {
        state.logger.error({
            asyncIncreaseHitError: err,
        }, 'Error while processing request in redirect');
        throw errors.newErrors.badRequest('Error while processing request in redirect');
    }
}

async function newEntry(url, state) {
    try {
        const entry = await shorturlModel.create({
            url,
        });

        return parseInt(entry._id, 10).toString(36);
    } catch (err) {
        state.logger.error({
            asyncIncreaseHitError: err,
        }, 'Error while processing request in newEntry');
        throw errors.newErrors.badRequest('Error while processing request in newEntry');
    }
}

module.exports = {
    redirect,
    newEntry,
};
