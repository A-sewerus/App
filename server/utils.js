const db = require('./db')

function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * i);
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
        }
        return array;
}

function randomPhrase(obj) {
        let arr = obj.en.split(' ');
        return { id: obj.id, en: shuffleArray(arr), ru: obj.ru };
}

function checkAnswer(obj) {
        var index = obj.id;
        var listPhrases = db.getPhrases();
        if (obj.answer === listPhrases[index].en) {
                return listPhrases[index].points + "";
        } else {
                return "0";
        }
}



module.exports = {
        randomPhrase: randomPhrase,
        checkAnswer: checkAnswer
}