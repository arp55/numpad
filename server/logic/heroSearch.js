const keys = {
    2: ["A", "B", "C"],
    3: ["D", "E", "F"],
    4: ["G", "H", "I"],
    5: ["J", "K", "L"],
    6: ["M", "N", "O"],
    7: ["P", "Q", "R", "S"],
    8: ["T", "U", "V"],
    9: ["W", "X", "Y", "Z"]
}

function search(arr, hero, i) {
    var length = hero.length;
    if (i === length) {
        return true;
    }
    hero = hero.toUpperCase();

    let values = keys[arr[i]];
    let start = 0, last = values.length - 1
    let mid = Math.floor((start + last) / 2);
    if (values.length === 3 && (hero[i].charCodeAt(0) < values[mid].charCodeAt(0) - 1 || hero[i].charCodeAt(0) > values[mid].charCodeAt(0) + 1)) {
        return false;
    }
    else if (values.length === 4 && ((hero[i].charCodeAt(0) < values[mid].charCodeAt(0) - 1 || hero[i].charCodeAt(0) > values[mid].charCodeAt(0) + 2))) {
        return false;
    }
    return search(arr, hero, ++i)
}

module.exports = search;