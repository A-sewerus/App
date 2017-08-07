const express = require('express');
const app = express();
const db = require('./db')
const utils = require('./utils')
const routes = require('./routes')

app.use(express.static('../public'));

function init() {
  db.readPhrases('../db/phrases.json', function (err) {
    if (err) return console.log(err);

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    })

    // utils.randomPhrase(db.getRandomPhrase())
  })
}
init();
app.use(routes.initRoutes());
