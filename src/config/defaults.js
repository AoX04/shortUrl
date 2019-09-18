const path = require('path');
const readPkgUp = require('read-pkg-up');

module.exports = {
    log: {
        bunyan: {
            init: {
                name: readPkgUp.sync().package.name,
                level: 'debug',
                streams: [{
                    stream: process.stdout,
                    type: 'stream',
                }],
            },
        },
    },
    params: {
    // true, if you want to output error into response output (recommended false on production)
        sendErrorStackTrace: false,
    },
    root: path.normalize(`${__dirname}/../..`),
    server: {
        port: 3000,
        nodeEnv: 'notSet', // NODE_ENV value, should be development or production
        configEnv: 'notSet', // CONFIG_ENV choose the env/ file to be merged
    },
    version: {
        apiVersion: 'API version was not set up',
        deploymentVersion: 'Deployment version was not set up',
    },
    urls: {
    },
};
