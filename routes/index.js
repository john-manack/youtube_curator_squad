'use strict';

const express = require('express'),
    router = express.Router(),
    tagsModel = require('../models/tagsModel');

router.get('/', async (req, res) => {
    const tagKeyData = await tagsModel.getTagList();
    res.render('template', {
        locals: {
            title: '',
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name,
            last_name: req.session.last_name,
            tagKeyData
        },
        partials: {
            body: 'partials/home'
        }
    })
});

module.exports = router;