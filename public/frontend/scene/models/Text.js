import getStyleSheet from "./getStyleSheet.js"

class Text {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.text = ""
        this.position = []
    }

    setStyle(key, value) {
        this.style[key] = value

        return this
    }

    setText(_text) {
        this.text = String(_text).toString()

        return this
    }

    to(x, y) {
        const render = typeof x === 'object' ? { 
            x: x.render.x,
            y: x.render.y + (y ? y : 0)
        } : { x, y }

        this.position = [ render.x, render.y ]

        return this
    }

    draw() {
        const styleSheet = getStyleSheet(this.style)
        const get = (key) => styleSheet[key] || undefined

        let metrics = null

        this.context.save()
        for (const key in styleSheet) {
            if (!get(key)) continue

            this.context[key] = get(key)
        }

        if (!this.style.strokeAfter && this.context.strokeStyle) {
            this.context.strokeText(this.text, ...this.position)
        }

        metrics = this.context.measureText(this.text)

        this.context.fillStyle && this.context.fillText(this.text, ...this.position)

        if (this.style.strokeAfter && this.context.strokeStyle) {
            this.context.strokeText(this.text, ...this.position)
        }
        this.context.restore()

        return metrics
    }
}

export default Text