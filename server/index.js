'use strict'
var express = require('express');
var app = express();


app.use(express.static('../public'));

function init() {
  readPhrases('../db/phrases.json', function (err) {
    if (err) return console.log(err)
    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    })
  })
}