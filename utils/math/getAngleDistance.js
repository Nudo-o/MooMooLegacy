function getAngleDistance(angleBetween, targetLookDir) {
    const difference = Math.abs(targetLookDir - angleBetween) % (Math.PI * 2)

    return (difference > Math.PI ? (Math.PI * 2) - difference : difference)
}

export default getAngleDistance