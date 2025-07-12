import { camera, gameCanvas, gameContext, im, images, renderer } from "../../const.js"
import layers from "../layers.json"
import config from "../../../../config.json"

const { biomes } = config

class Background {
    constructor() {
        this.id = layers.background.id
        this.layer = layers.background.layer

        this.riverWaterMult = 1
        this.riverWaterSide = 0

        renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    get width() {
        return gameCanvas.scaledWidth
    }

    get height() {
        return gameCanvas.scaledHeight
    }

    drawGrass(callback) {
        const { grass } = biomes

        gameContext.ctx.save()
        gameContext.ctx.fillStyle = grass.fill

        gameContext.ctx.fillRect(0, 0, this.width, this.height)
        gameContext.ctx.restore()

        callback instanceof Function && callback()
    }

    drawCoast(callback) {
        const { river } = biomes
        const riverHeight = river.height + river.padding
        const y = (config.map.height / 2) - camera.yOffset - (riverHeight / 2)

        if (y < this.height && y + riverHeight > 0) {
            gameContext.ctx.save()
            gameContext.ctx.fillStyle = river.fills[0]

            gameContext.ctx.fillRect(0, y, this.width, riverHeight)
            gameContext.ctx.restore()

            callback instanceof Function && callback()
        }
    }

    drawRiver(callback) {
        const { river } = biomes

        this.riverWaterMult += this.riverWaterSide * river.waveSpeed * renderer.delta

        if (this.riverWaterMult >= river.waveMax) {
            this.riverWaterMult = river.waveMax
            this.riverWaterSide = -1
        } else if (this.riverWaterMult <= 1) {
            this.riverWaterMult = this.riverWaterSide = 1
        }

        const riverHeight = river.height + (this.riverWaterMult - 1) * 250
        const y = (config.map.height / 2) - camera.yOffset - (riverHeight / 2)

        if (y < this.height && y + riverHeight > 0) {
            gameContext.ctx.save()
            gameContext.ctx.fillStyle = river.fills[1]

            gameContext.ctx.fillRect(0, y, this.width, riverHeight)
            gameContext.ctx.restore()

            callback instanceof Function && callback()
        }
    }

    render() {
        this.drawGrass()
        
        if (im.isPlaying || im.isKilled) {
            this.drawCoast(this.drawRiver.bind(this))
        }
    }
}

export default Background