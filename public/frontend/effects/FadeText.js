import { camera, fadeTexts, gameContext, renderer } from "../const.js"

class FadeText {
    constructor(id, text, x, y, size, speed, lifeTime, color) {
        this.id = id
        this.text = text
        this.x = x
        this.y = y
        this.size = this._size = size
        this.maxSize = this.size * 1.5
        this.speed = speed
        this.lifeTime = lifeTime
        this.color = color

        this.sizeSpeed = 0.7
    }

    render() {
        if (this.lifeTime <= 0) return fadeTexts.removeFadeText(this.id)

        this.lifeTime -= renderer.delta
        this.y -= this.speed * renderer.delta
        this.size += this.sizeSpeed * renderer.delta

        if (this.size >= this.maxSize) {
            this.size = this.maxSize
            this.sizeSpeed *= -1
        } else if (this.size <= this._size) {
            this.size = this._size
            this.sizeSpeed = 0
        }

        gameContext.ctx.save()
        gameContext.ctx.fillStyle = this.color
        gameContext.ctx.font = `${this.size}px Hammersmith One`
        gameContext.ctx.textAlign = "center"
        gameContext.ctx.textBaseline = "middle"

        gameContext.ctx.translate(this.x - camera.xOffset, this.y - camera.yOffset)
        gameContext.ctx.fillText(this.text, 0, 0)
        gameContext.ctx.restore()
    }
}

export default FadeText