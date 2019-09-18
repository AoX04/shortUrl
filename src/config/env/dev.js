exports.default = {
    log: {
        bunyan: {
            init: {
                level: 'TRACE',
                streams: [{
                    path: './dev.log',
                    type: 'file',
                    stream: null,
                }],
            },
        },
    },
    params: {
    },
};
