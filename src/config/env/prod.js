exports.default = {
    log: {
        bunyan: {
            init: {
                level: 'INFO',
                streams: [{
                    path: './prod.log',
                    type: 'file',
                    stream: null,
                }],
            },
        },
    },
    params: {
    },
};
