function lerpAngle(value1, value2, amount) {
    const difference = Math.abs(value2 - value1)
    
    if (difference > Math.PI) {
        if (value1 > value2) {
            value2 += Math.PI * 2
        } else {
            value1 += Math.PI * 2
        }
    }

    const value = value2 + ((value1 - value2) * amount)

    if (value >= 0 && value <= (Math.PI * 2)) return value
    
    return (value % (Math.PI * 2))
}

export default lerpAngle