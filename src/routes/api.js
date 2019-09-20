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

router.post(
    '/shortTop',
    validateReqParams(validation.shorturl),
    handleController(shorturl.shorturl),
);

exports.router = router;
