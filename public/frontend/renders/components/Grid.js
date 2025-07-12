import config from "../../../../config.json"
import layers from "../layers.json"
import { camera, gameCanvas, gameContext, im, renderer } from "../../const.js"
import utils from "../../../../utils/index.js"

const { grid } = config

class Grid {
    constructor() {
        this.id = layers.grid.id
        this.layer = layers.grid.layer

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

    render() {
        if (im.isAdmin && im.adminGridState) {
            const cellSize = 200
            const gridSizeX = config.map.width / cellSize
            const gridSizeY = config.map.height / cellSize
    
            for (let x = 0; x < gridSizeX; x += 1) {
                for (let y = 0; y < gridSizeY; y += 1) {
                    const middleX = (cellSize * x) + cellSize / 2
                    const middleY = (cellSize * y) + cellSize / 2

                    if (!im.isCanSee({ x: middleX, y: middleY, scale: 1 })) continue

                    gameContext.ctx.save()
                    gameContext.ctx.strokeStyle = "#6b54a0"
                    gameContext.ctx.globalAlpha = .4
    
                    gameContext.ctx.translate((cellSize * x) - camera.xOffset, (cellSize * y) - camera.yOffset)
                    gameContext.ctx.strokeRect(0, 0, cellSize, cellSize)
                    gameContext.ctx.restore()

                    const textModel = gameContext.createText({
                        "font": "18px Hammersmith One",
                        fill: "#ffffff",
                        alpha: .6,
                        stroke: config.darkGeneralStroke,
                        strokeWidth: 4,
                        textBaseline: "middle",
                        textAlign: "center",
                        lineJoin: "round"
                    })

                    textModel.to(middleX - camera.xOffset, middleY - camera.yOffset).setText(`${x}_${y}`).draw()
                }
            }
        }

        gameContext.ctx.save()
        gameContext.ctx.globalAlpha = grid.alpha
        gameContext.ctx.strokeStyle = grid.stroke
        gameContext.ctx.lineWidth = grid.strokeWidth

        gameContext.ctx.beginPath()

        for (let x = -camera.x; x < this.width; x += this.height / grid.divX) {
            if (x > 0) {
                gameContext.ctx.moveTo(x, 0)
                gameContext.ctx.lineTo(x, this.height)
            }
        }

        for (let y = -camera.y; y < this.height; y += this.height / grid.divY) {
            if (y > 0) {
                gameContext.ctx.moveTo(0, y)
                gameContext.ctx.lineTo(this.width, y)
            }
        }

        gameContext.ctx.stroke()
        gameContext.ctx.restore()
    }
}

export default Grid