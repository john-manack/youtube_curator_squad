'use strict';

const express = require('express'),
    router = express.Router(),
    fetch = require('node-fetch'),
    users = require('../models/usersModel'),
    favoritesModel = require('../models/favoritesModel'),
    tagsModel = require('../models/tagsModel');

// Get a list of videos from the API based on user search
router.get('/q=:query', async (req, res) => {
    const { query } = req.params; 
    const apiVideos = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}&type=video&videoDefinition=high&key=AIzaSyCq_TCYu-Z2neuQtQN11csA-m_KZz83wH4&resultsPerPage=10&videoEmbeddable=true&maxResults=18`
    ).then((response) => response.json());
    res.render('template', {
        locals: {
            title: 'Video Results',
            apiVideos,
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name,
            last_name: req.session.last_name
        },
        partials: {
            body: 'partials/content',
        }
    });
});

// Post a video to the req.params from the search bar
router.post('/search', async (req, res) => {
    const { search_input } = await req.body;
    console.log("search input is ", search_input);
    res.redirect(`/videos/q=${search_input}`);
});


// Get a particular video from the API to watch
router.get('/watch/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const tagKeyData = await tagsModel.getTagList();
    const videoTagData = await tagsModel.displayVideoTags(videoId);
    console.log("Tag data is :", videoTagData)
    res.render('template', {
        locals: {
            title: 'Watch video',
            videoId,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id,
            first_name: req.session.first_name,
            last_name: req.session.last_name,
            tagKeyData,
            videoTagData
        },
        partials: {
            body: 'partials/videoplayer',
        }
    });
});


// Post a video to the 'favorite_videos' table in the db.
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

// Get list of favorite videos from 'favorite_videos' table in the db
router.get('/favorites', async (req, res) => {
    const user_id = req.session.user_id;
    const user_full_name = `${req.session.first_name} ${req.session.last_name}`
    const Favorite = new favoritesModel(null, null, user_id)
    const result = await Favorite.getFavorites();
    const object = result.rows;
    const videoResponse = await Favorite.getVideoIdByUser();
    const videoList = videoResponse;
    console.log("Video list is :", videoList);
    const detailsArray = await Promise.all(videoList.map(async videoDetails => {
        const details = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${videoDetails.video_reference}&type=video&videoDefinition=high&key=AIzaSyCq_TCYu-Z2neuQtQN11csA-m_KZz83wH4&resultsPerPage=10&videoEmbeddable=true&maxResults=10`).then((response) => response.json());
        return details.items[0]
    }));
    console.log('Details array is :', detailsArray)
    res.render('template', {
        locals: {
            title: `${user_full_name}'s Favorites`,
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name,
            last_name: req.session.last_name,
            object,
            detailsArray
        },
        partials: {
            body: 'partials/favorites'
        },
    })
});

// Post a new tag to a particular video
router.post('/tag', async (req, res) => {
    const { videoId, tag_id } = req.body;
    const response = await tagsModel.addTagToVideo(videoId, tag_id)
    console.log(response); 
    if (response.rowCount >= 1) {
        res.redirect('back');
    }
    else {
        res.sendStatus(500);
    };
});

// Post a tag to the req.params from the tag selector on the home page
router.post('/searchtag', async (req, res) => {
    const { tag_name } = await req.body;
    console.log("search input is ", tag_name);
    res.redirect(`/videos/t=${tag_name}`);
});

// Get a list of videos from the tag database
router.get('/t=:tag_name', async (req, res) => {
    const { tag_name } = req.params;
    const tagged_videos = await tagsModel.getTaggedVideos(tag_name);
    const videoObjects = tagged_videos.rows;
    const videoList = videoObjects.map(object => {
        return object.video_reference;
    });
    const detailsArray = await Promise.all(videoList.map(async videoDetails => {
        const details = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${videoDetails}&type=video&videoDefinition=high&key=AIzaSyCq_TCYu-Z2neuQtQN11csA-m_KZz83wH4&resultsPerPage=10&videoEmbeddable=true&maxResults=10`).then((response) => response.json());
        return details.items[0]
    }));
    console.log(detailsArray)
    res.render('template', {
        locals: {
            title: 'Tag Results',
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name,
            last_name: req.session.last_name,
            tagged_videos,
            detailsArray
        },
        partials: {
            body: 'partials/tags',
        }
    });
});

module.exports = router;