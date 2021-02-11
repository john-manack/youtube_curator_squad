'use strict';

const express = require('express'),
    router = express.Router(),
    fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const apiVideos = await fetch(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=basketball&type=video&videoDefinition=high&key=AIzaSyBqP72gnX5iMsd_7Ij5CGND5OkLGuvY120'
    ).then((response) => response.json());

    res.render('template', {
        locals: {
            title: 'Video Results',
            apiVideos,
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            body: 'partials/content',
        }
    })
});

module.exports = router;