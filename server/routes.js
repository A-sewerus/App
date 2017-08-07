const express = require('express');
const db = require('./db')
const utils = require('./utils')

function initRoutes() {
    const router = express.Router();

    router.get('/task', function (req, res) {
        res.send(utils.randomPhrase(db.getRandomPhrase()));
    });
    return router;
}

module.exports = {
    initRoutes: initRoutes
}
