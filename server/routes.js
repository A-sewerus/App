function initRoutes() {
    const express = require('express');
    const router = express.Router();
    const db = require('./db')
    const utils = require('./utils')

    router.get('/task', function (req, res) {
        res.send(utils.randomPhrase(db.getRandomPhrase()));
    });
    return router;
}

module.exports = {
    initRoutes: initRoutes
}
