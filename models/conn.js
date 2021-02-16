'use strict';

const host = "ziggy.db.elephantsql.com",
    database = "arwuanmt",
    user = "arwuanmt",
    password = "PH23yhZ8Ji_Jpjd-YAAGRYG1KM0ByJ_P";

const pgp = require('pg-promise')({
    query: function (event) {
        console.log('QUERY: ', event.query)
    }
});

const options = {
    host, 
    database,
    user,
    password
}

const db = pgp(options);

module.exports = db;