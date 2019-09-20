
const shorturlModel = require('../repositories/shorturl');
const errors = require('../errors');

const crawler = require('./crawler');

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

async function top100(state) {
    try {

        const top100 = await shorturlModel.find({}, null,
        {
            skip:0,
            limit:100,
            sort:{
                hits: -1 //Sort by hits DESC
            }
        });

        top100.forEach( element => {
            element._id = parseInt(element._id, 10).toString(36);
        });

        return top100;
    } catch (err) {

        state.logger.error({
            top100Error: err,
        }, 'Error while processing request in top100');
        throw errors.newErrors.badRequest('Error while processing request in top100');
    }
}

async function newEntry(url, state) {
    try {
        const entry = await shorturlModel.create({
            url,
        });

        crawler.Queue.push({
            entry,
            state,
        });

        // The _id of the elements is a simple auto incremented number using mongoose-plugin-autoinc
        // in order to use the minimal ammount of digits we simply translate it base 36
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
    top100,
};
