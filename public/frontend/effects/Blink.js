import { gameContext, renderer } from "../const.js"

class Blink {
    constructor(object, color, alpha, scale, isMoreEffects) {
        this.object = object
        this.color = color
        this.alpha = alpha || 1
        this.size = this._size = scale
        this.isMoreEffects = isMoreEffects

        this.lineWidth = 1
        this.depth = 4
        this.rotation = 0
        this.lineOffset = 0
        this.lineOffsetReturn = false
        this.sizeReturn = false
    }

    render() {
        gameContext.ctx.save()
        gameContext.ctx.strokeStyle = this.color
        gameContext.ctx.lineWidth = this.lineWidth
        gameContext.ctx.lineJoin = "round"
        gameContext.ctx.globalAlpha = this.alpha

        gameContext.ctx.translate(this.object.render.x, this.object.render.y)
        gameContext.ctx.rotate(this.rotation)
        gameContext.ctx.strokeRect(-this.size, -this.size, this.size * 2, this.size * 2)
        gameContext.ctx.strokeRect(-this.size + this.depth, -this.size + this.depth, this.size * 2 - this.depth * 2, this.size * 2 - this.depth * 2)
        
        if (this.isMoreEffects) {
            const size = this.size + 10

            gameContext.ctx.rotate(-this.rotation * 2)
            gameContext.ctx.strokeRect(-size, -size, size * 2, size * 2)
            gameContext.ctx.strokeRect(-size + this.depth, -size + this.depth, size * 2 - this.depth * 2, size * 2 - this.depth * 2)
            gameContext.ctx.rotate(this.rotation * 2)
        }

        gameContext.ctx.beginPath()
        gameContext.ctx.moveTo(-this.size + this.depth, -this.size + this.lineOffset + this.depth)
        gameContext.ctx.lineTo(this.size - this.depth, -this.size + this.lineOffset + this.depth)
        gameContext.ctx.stroke()
        gameContext.ctx.closePath()
        gameContext.ctx.beginPath()
        gameContext.ctx.moveTo(-this.size + this.depth, -this.size + this.lineOffset + this.depth * 2)
        gameContext.ctx.lineTo(this.size - this.depth, -this.size + this.lineOffset + this.depth * 2)
        gameContext.ctx.stroke()
        gameContext.ctx.closePath()

        if (this.isMoreEffects) {
            gameContext.ctx.beginPath()
            gameContext.ctx.arc(-this.size + this.depth / 2, -this.size + this.lineOffset + this.depth * 1.5, this.depth * 1.25, 0, Math.PI * 2)
            gameContext.ctx.stroke()
            gameContext.ctx.closePath()
            gameContext.ctx.beginPath()
            gameContext.ctx.arc(-this.size + this.depth / 2, -this.size + this.lineOffset + this.depth * 1.5, this.depth * 2, 0, Math.PI * 2)
            gameContext.ctx.stroke()
            gameContext.ctx.closePath()

            gameContext.ctx.beginPath()
            gameContext.ctx.arc(this.size - this.depth / 2, -this.size + this.lineOffset + this.depth * 1.5, this.depth * 1.25, 0, Math.PI * 2)
            gameContext.ctx.stroke()
            gameContext.ctx.closePath()
            gameContext.ctx.beginPath()
            gameContext.ctx.arc(this.size - this.depth / 2, -this.size + this.lineOffset + this.depth * 1.5, this.depth * 2, 0, Math.PI * 2)
            gameContext.ctx.stroke()
            gameContext.ctx.closePath()
        }

        gameContext.ctx.beginPath()
        gameContext.ctx.moveTo(-this.size + this.lineOffset + this.depth, -this.size + this.depth)
        gameContext.ctx.lineTo(-this.size + this.lineOffset + this.depth, this.size - this.depth)
        gameContext.ctx.stroke()
        gameContext.ctx.closePath()
        gameContext.ctx.beginPath()
        gameContext.ctx.moveTo(-this.size + this.lineOffset + this.depth * 2, -this.size + this.depth)
        gameContext.ctx.lineTo(-this.size + this.lineOffset + this.depth * 2, this.size - this.depth)
        gameContext.ctx.stroke()
        gameContext.ctx.closePath()

        if (this.isMoreEffects) {
            gameContext.ctx.beginPath()
            gameContext.ctx.arc(-this.size + this.lineOffset + this.depth * 1.5, -this.size + this.depth / 2, this.depth * 1.25, 0, Math.PI * 2)
            gameContext.ctx.stroke()
            gameContext.ctx.closePath()
            gameContext.ctx.beginPath()
            gameContext.ctx.arc(-this.size + this.lineOffset + this.depth * 1.5, -this.size + this.depth / 2, this.depth * 2, 0, Math.PI * 2)
            gameContext.ctx.stroke()
            gameContext.ctx.closePath()

            gameContext.ctx.beginPath()
            gameContext.ctx.arc(-this.size + this.lineOffset + this.depth * 1.5, this.size - this.depth / 2, this.depth * 1.25, 0, Math.PI * 2)
            gameContext.ctx.stroke()
            gameContext.ctx.closePath()
            gameContext.ctx.beginPath()
            gameContext.ctx.arc(-this.size + this.lineOffset + this.depth * 1.5, this.size - this.depth / 2, this.depth * 2, 0, Math.PI * 2)
            gameContext.ctx.stroke()
            gameContext.ctx.closePath()
        }

        gameContext.ctx.restore()

        this.rotation += 0.0004 * renderer.delta

        if (this.lineOffsetReturn) {
            this.lineOffset -= 0.045 * renderer.delta

            if (this.lineOffset <= 0) {
                this.lineOffset = 0

                this.lineOffsetReturn = false
            }
        } else {
            this.lineOffset += 0.045 * renderer.delta

            if (this.lineOffset >= (this.size * 2 - this.depth * 3)) {
                this.lineOffset = this.size * 2 - this.depth * 3

                this.lineOffsetReturn = true
            }
        }
        
        if (!this.isMoreEffects) return

        if (this.sizeReturn) {
            this.size -= 0.008 * renderer.delta

            if (this.size <= this._size) {
                this.size = this._size

                this.sizeReturn = false
            }
        } else {
            this.size += 0.008 * renderer.delta

            if (this.size >= (this._size * 1.5)) {
                this.size = this._size * 1.5

                this.sizeReturn = true
            }
        }
    }
}

export default Blink