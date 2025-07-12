import { camera, gameContext, im, renderer } from "../../const.js"
import layers from "../layers.json"
import config from "../../../../config.json"

class Bridge {
    constructor() {
        this.id = layers.bridge.id
        this.layer = layers.bridge.layer

        this.boardHeight = 25

        renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    get x() {
        return config.map.width / 2
    }

    get y() {
        return config.map.height / 2
    }

    get startX() {
        return this.x - this.width / 2
    }

    get startY() {
        return this.y - this.height / 2
    }

    get endX() {
        return this.x + this.width / 2
    }

    get endY() {
        return this.y + this.height / 2
    }

    get width() {
        return config.bridge.width
    }

    get height() {
        return config.biomes.river.height + config.biomes.river.padding + config.bridge.paddingY
    }

    drawHandrail(side) {
        const width = this.width / config.bridge.handrailSizeDiv
        const x = side === "left" ? this.startX : this.endX - width

        gameContext.ctx.save()
        gameContext.ctx.fillStyle = config.bridge.fills[0]
        gameContext.ctx.strokeStyle = config.generalStroke
        gameContext.ctx.lineWidth = config.generalStrokeWidth

        gameContext.ctx.translate(x - camera.xOffset, this.startY - camera.yOffset)
        gameContext.ctx.beginPath()
        gameContext.ctx.roundRect(0, 0, width, this.height, 8)
        gameContext.ctx.fill()
        gameContext.ctx.stroke()

        gameContext.ctx.fillStyle = config.bridge.fills[1]

        gameContext.ctx.beginPath()
        gameContext.ctx.roundRect(config.bridge.handrailPadding, config.bridge.handrailPadding, width - config.bridge.handrailPadding * 2, this.height - config.bridge.handrailPadding * 2, 7)
        gameContext.ctx.fill()
        gameContext.ctx.restore()
    }

    drawFastener(sideX, sideY) {
        const handrailWidth = this.width / config.bridge.handrailSizeDiv
        const radius = this.width / (config.bridge.handrailSizeDiv + 3)
        const x = sideX === "left" ? this.startX + handrailWidth / 2 : this.endX - handrailWidth / 2
        const y = sideY === "up" ? this.startY : this.endY

        gameContext.ctx.save()
        gameContext.ctx.fillStyle = config.bridge.fills[0]
        gameContext.ctx.strokeStyle = config.generalStroke
        gameContext.ctx.lineWidth = config.generalStrokeWidth

        gameContext.ctx.translate(x - camera.xOffset, y - camera.yOffset)
        gameContext.ctx.beginPath()
        gameContext.ctx.arc(0, 0, radius, 0, Math.PI * 2)
        gameContext.ctx.fill()
        gameContext.ctx.stroke()

        gameContext.ctx.fillStyle = config.bridge.fills[1]

        gameContext.ctx.beginPath()
        gameContext.ctx.arc(0, 0, radius / 2.25, 0, Math.PI * 2)
        gameContext.ctx.fill()
        gameContext.ctx.restore()
    }
    
    drawHandrails() {
        this.drawHandrail("left")
        this.drawHandrail("right")
        this.drawFastener("left", "up")
        this.drawFastener("left", "down")
        this.drawFastener("right", "up")
        this.drawFastener("right", "down")
    }

    drawBoard(offsetY) {
        gameContext.ctx.save()
        gameContext.ctx.fillStyle = config.bridge.fills[0]
        gameContext.ctx.strokeStyle = config.generalStroke
        gameContext.ctx.lineWidth = config.generalStrokeWidth / 1.25

        gameContext.ctx.translate(this.startX - camera.xOffset, this.startY - camera.yOffset)
        gameContext.ctx.beginPath()
        gameContext.ctx.roundRect(0, offsetY, this.width, this.boardHeight - config.bridge.boardsGap, 6)
        gameContext.ctx.fill()
        gameContext.ctx.stroke()
        gameContext.ctx.restore()
    }

    drawBoards() {
        for (let offsetY = this.boardHeight; offsetY < this.height - this.boardHeight; offsetY += this.boardHeight) {
            this.drawBoard(offsetY - config.bridge.boardsGap / 2.5)
        }
    }

    render() {
        if (!im.isPlaying && !im.isKilled) return

        this.drawBoards()
        this.drawHandrails()
    }
}

export default Bridge