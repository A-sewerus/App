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
    return shuffleArray(arr);
}

module.exports = {
    randomPhrase: randomPhrase
}