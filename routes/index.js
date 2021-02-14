'use strict';

const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {

    res.render('template', {
        locals: {
            title: 'squadTube',
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            body: 'partials/home'
        }
    })
});

module.exports = router;