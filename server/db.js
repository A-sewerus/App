'use strict'
var fs = require('fs');
var listPhrases = [];

function readPhrases(filename, callback) {
    fs.readFile(filename, function (err, content) {
        if (err) return callback(err)
        listPhrases = JSON.parse(content);
        callback()
    })
}

function randomIndex(max) {
    return Math.floor(Math.random() * (max + 1));
}

function getRandomPhrase(listPhrases) {
    return listPhrases[randomIndex(listPhrases.length)]
}

module.exports = { readPhrases: readPhrases, getRandomPhrase: getRandomPhrase }