import getStyleSheet from "./getStyleSheet.js"

class Circle  {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.position = []
        this.offset = [ 0, 0 ]
        this.radius = 0
        this.rotate = 0
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

        if (typeof x === 'object' && Array.isArray(y)) {
            this.offset = y
        }

        return this
    }

    setRadius(_radius) {
        this.radius = Math.max(0, _radius)

        return this
    }

    setRotate(_rotate) {
        this.rotate = _rotate

        return this
    }

    draw() {
        const styleSheet = getStyleSheet(this.style)
        const get = (key) => styleSheet[key] || undefined

        this.context.save()
        for (const key in styleSheet) {
            this.context[key] = key === "globalAlpha" ? typeof get(key) === 'undefined' ? 0 : get(key) : get(key)
        }

        if (this.rotate) {
            this.context.translate(...this.position)
            this.context.rotate(this.rotate)
            this.context.beginPath()
            this.context.arc(this.offset[0], this.offset[1], this.radius, 0, Math.PI * 2)
        } else {
            this.context.beginPath()
            this.context.arc(this.position[0] + this.offset[0], this.position[1] + this.offset[1], this.radius, 0, Math.PI * 2)
        }

        this.context.closePath()
        this.context.fillStyle && this.context.fill()
        this.context.strokeStyle && this.context.stroke()
        this.context.restore()
    }
}

export default Circle