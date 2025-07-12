function decel(value, cel) {
    if (value > 0) {
        value = Math.max(0, value - cel)
    } else if (value < 0) {
        value = Math.min(0, value + cel)
    }

    return value
}

export default decel