import getStyleSheet from "./getStyleSheet.js"

class Rect {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.position = []
        this.size = []
    }

    setStyle(key, value) {
        this.style[key] = value

        return this
    }

    to(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y
        } : { x, y }

        this.position = [ render.x, render.y ]

        return this
    }

    setSize(width, height) {
        this.size = [ width, height ]

        return this
    }

    draw() {
        const styleSheet = getStyleSheet(this.style)
        const get = (key) => styleSheet[key] || undefined

        this.context.save()
        for (const key in styleSheet) {
            if (!get(key)) continue

            this.context[key] = get(key)
        }

        this.context.rect(this.position[0], this.position[1], this.size[0], this.size[1])
        this.context.fillStyle && this.context.fill()
        this.context.strokeStyle && this.context.stroke()
        this.context.restore()
    }
}

export default Rect