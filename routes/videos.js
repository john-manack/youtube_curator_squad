'use strict';

const express = require('express'),
    router = express.Router(),
    fetch = require('node-fetch'),
    users = require('../models/users'),
    favoritesModel = require('../models/favorites');

router.get('/q=:query', async (req, res) => {
    const { query } = req.params; 
    const apiVideos = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}&type=video&videoDefinition=high&key=AIzaSyCSM_aP_AujLtVzLcv3vXqgQBnCRFhUn6w&resultsPerPage=10&videoEmbeddable=true&maxResults=18`
    ).then((response) => response.json());
    console.log(apiVideos.items[0].id.videoId);

    res.render('template', {
        locals: {
            title: 'Video Results',
            apiVideos,
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            body: 'partials/content',
        }
    });
});

router.post('/search', async (req, res) => {
    const { search_input } = await req.body;
    console.log("search input is ", search_input);
    res.redirect(`/videos/q=${search_input}`);
});

router.get('/watch/:videoId', (req, res) => {
    const { videoId } = req.params;
    console.log(videoId);
    res.render('template', {
        locals: {
            title: 'Watch video',
            videoId,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id,
        },
        partials: {
            body: 'partials/videoplayer',
        }
    });
});

router.post('/add', async (req, res) => {
    const { videoId, user_id } = req.body;
    console.log('adding favorite video', videoId);
    console.log('user id is', user_id);
    const Favorite = new favoritesModel(null, videoId, user_id);
    const response = await Favorite.addFavorites();
    console.log(response); 
    if (response.rowCount >= 1) {
        res.redirect('back');
    }
    else {
        res.sendStatus(500);
    };
});

module.exports = router;