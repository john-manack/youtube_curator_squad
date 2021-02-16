'use strict';

const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    users = require('../models/usersModel');

// Get signup page
router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: 'Register for squadTube',
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name,
            last_name: req.session.last_name
        },
        partials: {
            body: 'partials/signup'
        },
    });
});

// Get login page
router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Log In',
            is_logged_in: req.session.is_logged_in,
            first_name: req.session.first_name,
            last_name: req.session.last_name
        },
        partials: {
            body: 'partials/login',
        },
    });
});

// Get logout action to end user session
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

// Post a new user to the database with password encryption
router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const response = await users.addUser(
        first_name, 
        last_name, 
        email, 
        hash
    );
    console.log("Registration Response:", response);
    if (response.id) {
        res.redirect('/users/login');
    } else {
        res.send("ERROR: Please Try Submitting Again").status(500);
    }
});

// Post a new user session to express sessions.
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = new users(null, null, null, email, password);
    const response = await user.login();

    if (!!response.isValid) {
        req.session.is_logged_in = response.isValid;
        req.session.user_id = response.user_id;
        req.session.first_name = response.first_name;
        req.session.last_name = response.last_name;
        res.redirect('/');
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;