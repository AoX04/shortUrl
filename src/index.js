const config = require('./config');
const { app } = require('./app');
const { logger } = require('./components/logger');

const { port } = config.server;

async function startServer() {
    app.listen(port, () => {
        logger.info(
            {
                port,
                params: config.params,
                processEnv: process.env,
            },
            'App has started',
        );
    });
}

startServer();
