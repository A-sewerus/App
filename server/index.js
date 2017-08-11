const express = require('express');
const app = express();
const db = require('./db')
const routes = require('./routes')
const config = require('./config')


app.use(express.static('../public'));
app.use(routes.initRoutes());

(function init() {
        db.readPhrases(config.db.path, function (err) {
                if (err) return console.log(err);

                app.listen(config.server.port, function () {
                        console.log('Example app listening on port ' + config.server.port + '!');
                })
        })
})()

