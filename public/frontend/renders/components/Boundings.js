import { camera, gameCanvas, gameContext, renderer } from "../../const.js"
import layers from "../layers.json"
import config from "../../../../config.json"

class Boundings {
    constructor() {
        this.id = layers.boundings.id
        this.layer = layers.boundings.layer

        renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    render() {
        const width = gameCanvas.scaledWidth
        const height = gameCanvas.scaledHeight

        gameContext.ctx.save()
        gameContext.ctx.fillStyle = config.boundings.fill
        gameContext.ctx.globalAlpha = config.boundings.alpha

        if (camera.xOffset <= 0) {
            gameContext.ctx.fillRect(0, 0, -camera.xOffset, height)
        }

        if (config.map.width - camera.xOffset <= width) {
            const tmpY = Math.max(0, -camera.yOffset)
    
            gameContext.ctx.fillRect(config.map.width - camera.xOffset, tmpY, width - (config.map.width - camera.xOffset), height - tmpY)
        }

        if (camera.yOffset <= 0) {
            gameContext.ctx.fillRect(-camera.xOffset, 0, width + camera.xOffset, -camera.yOffset)
        }

        if (config.map.height - camera.yOffset <= height) {
            const tmpX = Math.max(0, -camera.xOffset)
    
            let tmpMin = 0
    
            if (config.map.width - camera.xOffset <= width) {
                tmpMin = width - (config.map.width - camera.xOffset)
            }
    
            gameContext.ctx.fillRect(
                tmpX, config.map.height - camera.yOffset,
                (width - tmpX) - tmpMin,
                height - (config.map.height - camera.yOffset)
            )
        }

        gameContext.ctx.restore()
    }
}

export default Boundings