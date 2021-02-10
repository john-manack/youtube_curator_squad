'use strict';

const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;