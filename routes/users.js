'use strict';

const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    users = require('../models/users');

router.get('/signup', (req, res) => {

    res.render('template', {
        locals: {
            title: 'Sign-up NOW!!!',
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            body: 'partials/signup'
        },
    });
});

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: 'User Log In',
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            body: 'partials/login',
        },
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

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