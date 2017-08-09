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
        return Math.floor(Math.random() * (max - 1));
}

function getRandomPhrase() {
        var i = randomIndex(listPhrases.length);
        return { id: i, en: listPhrases[i].en, ru: listPhrases[i].ru };
}

module.exports = {
        readPhrases: readPhrases,
        getRandomPhrase: getRandomPhrase
}