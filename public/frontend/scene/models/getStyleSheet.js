function getStyleSheet(style) {
    const styleSheet = {}
    const set = (key, value) => (styleSheet[key] = value)

    for (const key in style) {
        switch (key) {
            case "fill":
            case "fillStyle":
                set("fillStyle", style[key])
            break

            case "stroke":
            case "strokeStyle":
                set("strokeStyle", style[key])
            break

            case "strokeWidth":
            case "lineWidth":
                set("lineWidth", parseFloat(style[key]))
            break

            case "alpha":
            case "opacity":
            case "globalAlpha":
                set("globalAlpha", parseFloat(style[key]))
            break

            default:
                set(key, style[key])
        }
    }

    return styleSheet
}

export default getStyleSheet