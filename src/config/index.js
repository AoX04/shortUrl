const _ = require('lodash');
const defaults = require('./defaults');
const { envs } = require('./envs');

if (!_.has(process.env, 'CONFIG_ENV')) {
    throw Error('You have to set up your environment');
}

let envPath;
const configEnv = process.env.CONFIG_ENV;

try {
    envPath = require.resolve(`./env/${configEnv}`);
} catch (err) {
    console.error(err);
    throw Error(`Couldn't find enviroment configuration for ${configEnv}`);
}

const config = _.merge(
    {},
    defaults,
    require(envPath).default,
    envs,
);

module.exports = config;
