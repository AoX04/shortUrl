const _ = require('lodash');
const bunyan = require('bunyan');
const config = require('../../config');

const logger = bunyan.createLogger(_.merge(
    config.log.bunyan.init,
));

process.on('unhandledRejection', (reason, p) => {
    logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    logger.error(p._trace ? p._trace.stack : p);
});

process.on('uncaughtException', (err) => {
    logger.error('An uncaught exception occurred!');
    logger.error(err.stack ? err.stack : err);
});

exports.logger = logger;
