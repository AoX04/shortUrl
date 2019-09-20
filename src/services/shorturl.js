
const shorturlModel = require ('../repositories/shorturl');
/**
 * @param {Req} req
 * @returns {Promise<{General}>}
 */

async function asyncIncreaseHit(entry, state){
    try{
        await entry.update({ $inc: { hits: 1 }})
    } catch (err) {
        state.logger.error({ 
            entry,
            asyncIncreaseHitError: err, 
        }, 'Error while processing entry in asyncIncreaseHit');
    }
}

async function redirect(id, state) {
    try{
        const parsedId = parseInt(id,36);
        console.log({parsedId});
        const entry = await shorturlModel.findById(parsedId);
        console.log({entry});
        if (!entry) return null;

        asyncIncreaseHit(entry, state);

        return entry.url;
    } catch (err) {
        state.logger.error({ 
            entry,
            asyncIncreaseHitError: err, 
        }, 'Error while processing request in redirect');
    }
}

async function newEntry(url,state){
    try{

        const entry = await shorturlModel.create({
            url,
        });
        // await entry.save();

        console.log('---------------', entry);
        console.log('---------------', typeof entry._id);
        return parseInt(entry._id).toString(36);

    } catch (err) {
        state.logger.error({ 
            asyncIncreaseHitError: err, 
        }, 'Error while processing request in newEntry');
    }
}

module.exports = {
    redirect,
    newEntry,
}
