import getStyleSheet from "./getStyleSheet.js"

class Line {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.moveTo = []
        this.lineTo = []
    }

    setStyle(key, value) {
        this.style[key] = value

        return this
    }

    from(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y
        } : { x, y }

        this.moveTo = [ render.x, render.y ]

        return this
    }

    to(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y
        } : { x, y }

        this.lineTo = [ render.x, render.y ]

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

        this.context.beginPath()
        this.context.moveTo(...this.moveTo)
        this.context.lineTo(...this.lineTo)
        this.context.closePath()
        this.context.fillStyle && this.context.fill()
        this.context.strokeStyle && this.context.stroke()
        this.context.restore()
    }
}

export default Line