/* Basic definition of express */
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

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

app.use(bodyParser.json());

app.use(router);

exports.app = app;
