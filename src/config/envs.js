const { env } = process;

exports.envs = {
    log: {
        bunyan: {
            init: {
                level: env.logLevel,
            },
        },
    },
    server: {
        nodeEnv: env.NODE_ENV,
        configEnv: env.CONFIG_ENV,
        port: env.PORT,
        region: env.region,
    },
    version: {
        apiVersion: env.apiVersion,
        deploymentVersion: env.deploymentVersion,
    },
    params: {
    },
    urls: {
    },
};
