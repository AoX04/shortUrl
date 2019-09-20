// Config available in
// const config = require('../config/index');
const express = require('express');
const api = require('./api');
const middleware = require('../middleware');

const router = express.Router();

// region internal
// endregion

// region custom routes
router.use('/api/v1/shorturl', api.router);
// endregion

router.use(middleware.errorHandler);
router.use(middleware.standardHandler);

module.exports = router;
