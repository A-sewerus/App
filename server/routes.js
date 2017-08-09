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

        // router.get('/task', function (req, res) {
        //         res.send(utils.randomPhrase(db.getRandomPhrase()));
        // });
        // return router;

        router.post('/answer', upload.array(), function (req, res) {
                var userAnswer = { id: req.body[0].id, answer: req.body[0].answer }
                //console.log(userAnswer);
                res.send(utils.checkAnswer(userAnswer));
        });
        return router;
}


module.exports = {
        initRoutes: initRoutes
}
