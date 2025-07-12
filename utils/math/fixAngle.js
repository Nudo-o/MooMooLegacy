function fixAngle(angle) {
    return Math.atan2(Math.cos(angle), Math.sin(angle))
}

export default fixAngle