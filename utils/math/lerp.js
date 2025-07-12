function lerp(value1, value2, amount) {
    return value1 + (value2 - value1) * amount
}

export default lerp