function getDirection(x1, y1, x2, y2) {
    if (x1 instanceof Object && y1 instanceof Object) {
        return Math.atan2(x1.y - y1.y, x1.x - y1.x)
    }

    return Math.atan2(y1 - y2, x1 - x2)
}

export default getDirection