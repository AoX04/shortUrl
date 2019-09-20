const express = require('express');
const {
    handleController,
    validateReqParams,
} = require('../middleware');
const shorturl = require('../controllers/shorturl');

const validation = require('./validation');

const router = express.Router();

router.post(
    '/short',
    validateReqParams(validation.shorturl),
    handleController(shorturl.shorturl),
);

router.get(
    '/top100.json',
    handleController(shorturl.top100),
);

router.get(
    '/:redirectId',
    validateReqParams(validation.redirect),
    handleController(shorturl.redirect),
);

exports.router = router;
