const async = require('async');
const axios = require('axios');
const cheerio = require('cheerio')

const errors = require('../errors');

/**
 * @param {Req} req
 * @returns {Promise<{General}>}
 */

// https://caolan.github.io/async/v3/docs.html#queue
// Queue function, with concurrency 3
// to add aditional elements to fetch just push em Queue.push({ entry,state, });
const Queue = async.queue( async function(task) {
    try {
        console.log({task});
        const page = await axios({
            method: 'get',
            url: task.entry.url,
        });

        const $ = cheerio.load(page.data);
        const title = $('title').text()
        console.log({title});
        await task.entry.updateOne({ 
            title,
        });

        return title;

    } catch (err) {
        state.logger.error({
            asyncIncreaseHitError: err,
        }, 'Error while processing request in newEntry');
    }
}, 3);


module.exports = {
    Queue,
};
