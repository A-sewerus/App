const express = require('express');
const db = require('./db')
const utils = require('./utils')
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

function initRoutes() {
        const router = express.Router();
        router.use(bodyParser.json());
        router.use(bodyParser.urlencoded({ extended: true }));

        router.post('/answer', upload.array(), function (req, res) {
                var userAnswer = { id: req.body.id, answer: req.body.answer }
                res.send(utils.checkAnswer(userAnswer));
        });

        router.get('/task', function (req, res) {
                res.send(utils.randomPhrase(db.getRandomPhrase()));
        });
        return router;
}


module.exports = {
        initRoutes: initRoutes
}
