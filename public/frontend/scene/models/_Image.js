import getStyleSheet from "./getStyleSheet.js"

class _Image {
    constructor(context, style) {
        this.context = context
        this.style = style

        this.image = null
        this.position = []
        this.size = []
        this.offset = [ 0, 0 ]
        this.rotate = null
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

    setSize(width, height) {
        this.size = [ width, (typeof height === 'undefined' ? width : height) ]

        return this
    }

    setImage(_image) {
        this.image = _image

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
            if (!get(key)) continue

            this.context[key] = get(key)
        }

        if (typeof this.rotate === 'undefined') {
            return this.context.drawImage(this.image, this.position[0] + this.offset[0], this.position[1] + this.offset[1], this.size[0], this.size[1])
        }
        
        this.context.translate(this.position[0], this.position[1])
        this.context.rotate(this.rotate)
        this.context.drawImage(this.image, this.offset[0], this.offset[1], this.size[0], this.size[1])
        this.context.restore()
    }
}

export default _Image