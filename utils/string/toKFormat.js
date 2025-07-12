function toKFormat(value) {
    value = parseFloat(value)

    return value > 999 ? `${(value / 1000).toFixed(1)}k` : value
}

export default toKFormat