const { Agent } = require('./Agent');

exports.prepare = () => {
    const server = require('../../../src/app');
    const promises = [];
    const anonymous = new Agent(server.app);
    const out = {
        users: {
            anonymous,
        },
    };

    return Promise.all(promises).then(() => out);
};
