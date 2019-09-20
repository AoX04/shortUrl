/* Basic definition of express */
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const uuidv4 = require('uuid/v4');

const { logger } = require('./components/logger');

const router = require('./routes');

const app = express();
app.use(cors());

// Compression middleware (should be placed before express.static)
app.use(compression({
    threshold: 512,
}));

// bodyParser should be above methodOverride
app.use(bodyParser.urlencoded({
    extended: true,
}));

function createChildLogger(req, res, next) {
    const childLogger = logger.child({
        sessionId: uuidv4(),
    });

    // Initialization the logTimes
    const logTimes = {
        first: new Date(),
        previous: new Date(),
    };

    req.state = {
        logTimes,
        logger: childLogger,
    };
    return next();
}

app.use(createChildLogger);
app.use(bodyParser.json());

app.use(router);

exports.app = app;
