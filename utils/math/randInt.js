function randInt(min, max) {
    if (typeof max === 'undefined') {
        max = min
        min = 0
    }

    return Math.floor(Math.random() * (max - min + 1)) + min
}

export default randInt