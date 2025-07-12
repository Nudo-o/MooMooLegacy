function randFloat(min, max) {
    if (typeof max === 'undefined') {
        max = min
        min = 0
    }

    return (Math.random() * (max - min + 1)) + min
}

export default randFloat