const express = require('express');
const app = express();
const db = require('./db')
const utils = require('./utils')

app.use(express.static('../public'));

function init() {
  db.readPhrases('../db/phrases.json', function (err) {
    if (err) return console.log(err);

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    })
    //db.getRandomPhrase()
    //console.log(utils.randomEngPhrase(db.getRandomPhrase()));
    utils.randomEngPhrase(db.getRandomPhrase())
  })
}
init();
