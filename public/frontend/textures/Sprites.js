import config from "../../../config.json"
import items from "../../../items.json"
import utils from "../../../utils/index.js"
import { gameContext } from "../const.js"

class Sprites {
    constructor() {
        this.items = new Map()
        this.resources = new Map()
        this.weapons = new Map()
    }

    getWeaponSprite(weaponIndex, offsetX, offsetY, isIcon) {
        const id = `${weaponIndex}${isIcon ? "_icon" : ""}`
        const sprite = this.weapons.get(id)

        if (sprite) return sprite

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        const compression = isIcon ? 0.35 : 1
        const drawStick = (offsetX, offsetY, width, height, radius = 5) => {
            context.fillStyle = "#9e7543"

            context.beginPath()
            context.roundRect(offsetX, offsetY, width, height, radius * compression)
            context.fill()
            context.stroke()
        }

        canvas.width = canvas.height = isIcon ? 66 : 2.1 * 150 + config.generalStrokeWidth + (items.weapons[weaponIndex].spritePadding || 0)

        context.strokeStyle = config.generalStroke
        context.lineWidth = isIcon ? 2 : config.generalStrokeWidth

        context.translate(canvas.width / 2 - (isIcon ? 10 : 0), canvas.height / 2 + (isIcon ? 5 : 0))
        isIcon && context.rotate(1.3 * Math.PI)
        isIcon && context.scale(1.1, 1.1)

        switch (weaponIndex) {
            case 0:
                drawStick(offsetX - 18 * compression, offsetY - 44 * compression, 16 * compression, 125 * compression)

                context.fillStyle = "#939393"

                context.beginPath()
                context.roundRect(offsetX - 25 * compression, offsetY + 49 * compression, 45 * compression, 25 * compression, 5 * compression)
                context.fill()
                context.stroke()
            break

            case 1:
                drawStick(offsetX - 18 * compression, offsetY - 44 * compression, 16 * compression, 135 * compression)

                context.fillStyle = "#939393"

                context.beginPath()
                context.roundRect(offsetX - 25 * compression, offsetY + 49 * compression, 60 * compression, 34 * compression, 5 * compression)
                context.fill()
                context.stroke()
            break

            case 2:
                drawStick(offsetX - 18 * compression, offsetY - 44 * compression, 16 * compression, 125 * compression)

                context.fillStyle = "#939393"

                context.beginPath()
                context.roundRect(offsetX - 22 * compression, offsetY + 40 * compression, 25 * compression, 70 * compression, 4 * compression)
                context.fill()
                context.stroke()
            break

            case 3:
                drawStick(offsetX - 22 * compression, offsetY - 75 * compression, 20 * compression, 200 * compression)

                context.save()
                context.translate(offsetX - 13 * compression, offsetY + 120 * compression)
                context.rotate(utils.randAngle())
                context.fillStyle = "#939393"

                gameContext.drawStar(context, 6, 50, 0.6 * 50)
                context.fill()
                context.stroke()
                context.restore()

                context.fillStyle = "#937c4b"

                context.beginPath()
                context.arc(offsetX - 13 * compression, offsetY + 120 * compression, 35 * compression, 0, Math.PI * 2)
                context.fill()
                context.stroke()

                context.fillStyle = "#9e7543"

                context.beginPath()
                context.arc(offsetX - 13 * compression, offsetY + 120 * compression, 22 * compression, 0, Math.PI * 2)
                context.fill()
            break
        }

        this.weapons.set(id, canvas)
        
        return this.weapons.get(id)
    }

    getItemSprite(item, isIcon) {
        const itemData = item.isItem ? item.itemData : item
        const id = `${itemData.id}${isIcon ? "_icon" : ""}`

        let sprite = this.items.get(id)

        if (sprite) return sprite

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        canvas.width = canvas.height = 2.5 * itemData.scale + config.generalStrokeWidth + (itemData.spritePadding || 0)

        context.strokeStyle = config.generalStroke
        context.lineWidth = config.generalStrokeWidth * (isIcon ? canvas.width / 78 : 1)

        if (isIcon) {
            context.imageSmoothingEnabled = context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = true
        }

        context.translate(canvas.width / 2, canvas.height / 2)
        context.rotate(isIcon ? 0 : itemData.noSpriteRotate ? 0 : Math.PI / 2)
        isIcon && context.scale(0.75, 0.75)

        switch (itemData.id) {
            case 0: {
                const angle = -(Math.PI / 2)

                context.fillStyle = "#c15555"

                gameContext.drawCircle(context, 0, 0, itemData.scale)

                context.fillStyle = "#89a54c"

                gameContext.drawLeaf(context, itemData.scale * Math.cos(angle), itemData.scale * Math.sin(angle), 25, angle + Math.PI / 2)
            } break

            case 1: {
                const angle = (Math.PI * 2) / 4

                context.fillStyle = "#cca861"

                gameContext.drawCircle(context, 0, 0, itemData.scale)

                context.fillStyle = "#937c4b"

                for (let i = 0; i < 4; ++i) {
                    const scale = utils.randInt(itemData.scale / 2.5, itemData.scale / 1.7)

                    gameContext.drawCircle(context, scale * Math.cos(angle * i), scale * Math.sin(angle * i), utils.randInt(4, 5), true)
                }
            } break

            case 2:
            case 3:
                context.fillStyle = itemData.id === 2 ? "#a5974c" : "#939393"

                gameContext.drawStar(context, 3, 1.1 * itemData.scale, 1.1 * itemData.scale)
                context.fill()
                context.stroke()

                context.fillStyle = itemData.id === 2 ? "#c9b758" : "#bcbcbc"

                gameContext.drawStar(context, 3, 0.65 * itemData.scale, 0.65 * itemData.scale)
                context.fill()
            break

            case 4:
            case 5: {
                const radius = 0.6 * itemData.scale

                context.fillStyle = "#939393"

                gameContext.drawStar(context, itemData.id === 4 ? 5 : 6, itemData.scale, radius)
                context.fill()
                context.stroke()

                context.fillStyle = "#a5974c"

                gameContext.drawCircle(context, 0, 0, radius)

                context.fillStyle = "#c9b758"

                gameContext.drawCircle(context, 0, 0, radius / 2, true)
            } break

            case 6:
            case 7:
                context.fillStyle = "#a5974c"

                gameContext.drawCircle(context, 0, 0, itemData.scale)

                context.fillStyle = "#c9b758"

                gameContext.drawRectCircle(context, 0, 0, 1.5 * itemData.scale, 29, 4)

                context.fillStyle = "#a5974c"

                gameContext.drawCircle(context, 0, 0, 0.5 * itemData.scale)
            break

            case 8:
                context.fillStyle = "#a5974c"

                gameContext.drawStar(context, 3, itemData.scale * 1.1, itemData.scale * 1.1)
                context.fill()
                context.stroke()

                context.fillStyle = config.generalStroke
                
                gameContext.drawStar(context, 3, itemData.scale * 0.65, itemData.scale * 0.65)
                context.fill()
            break

            case 9:
                context.fillStyle = "#7e7f82"

                gameContext.drawRect(context, 0, 0, itemData.scale * 2, itemData.scale * 2)
                context.fill()
                context.stroke()

                context.fillStyle = "#dbd97d"

                gameContext.drawTriangle(context, itemData.scale * 1)
            break

            case 10:
                context.fillStyle = "#939393"

                gameContext.drawStar(context, 3, itemData.scale, itemData.scale)
                context.fill()
                context.stroke()

                context.fillStyle = "#bcbcbc"

                gameContext.drawStar(context, 3, 0.55 * itemData.scale, 0.65 * itemData.scale)
                context.fill()
            break

            case 11: {
                context.fillStyle = "#8c5c40"
                
                gameContext.drawStar(context, 4, itemData.scale, itemData.scale)
                context.fill()
                context.stroke()

                context.fillStyle = "#b27957"

                gameContext.drawStar(context, 4, itemData.scale * 0.8, itemData.scale * 0.8)
                context.fill()

                const coinScale = itemData.scale / 4
                const drawCoin = (offsetX, offsetY) => {
                    context.save()
                    context.translate(offsetX, offsetY)

                    context.fillStyle = "#e0c655"
                    context.lineWidth = parseFloat(context.lineWidth) / 2

                    gameContext.drawStar(context, 4, coinScale, coinScale)
                    context.fill()
                    context.stroke() 

                    context.fillStyle = "#ebdca3"
                
                    gameContext.drawStar(context, 4, coinScale * 0.65, coinScale * 0.65)
                    context.fill()
                    context.restore()
                }

                for (let layer = (itemData.scale / coinScale) / 2; layer > 0; layer -= 1) {
                    const div = 1.75

                    drawCoin((coinScale / div) * layer, (coinScale / div) * layer)
                    drawCoin(-(coinScale / div) * layer, -(coinScale / div) * layer)
                    drawCoin((coinScale / div) * layer, -(coinScale / div) * layer)
                    drawCoin(-(coinScale / div) * layer, (coinScale / div) * layer)

                    drawCoin(coinScale * layer, 0)
                    drawCoin(-coinScale * layer, 0)
                    drawCoin(0, coinScale * layer)
                    drawCoin(0, -coinScale * layer)
                }

                drawCoin(0, 0)
            } break
        }

        this.items.set(id, canvas)

        return this.items.get(id)
    }

    getResourceSprite(resource) {
        const id = resource.resourceType + "_" + resource.scale

        let sprite = this.resources.get(id)

        if (sprite) return sprite

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        canvas.width = canvas.height = 2.1 * resource.scale + config.generalStrokeWidth

        context.strokeStyle = config.generalStroke
        context.lineWidth = config.generalStrokeWidth

        context.translate(canvas.width / 2, canvas.height / 2)
        context.rotate(utils.randFloat(0, Math.PI))

        switch (resource.resourceType) {
            case 0:
                for (let i = 0; i < 2; ++i) {
                    const scale = resource.scale * (i ? 0.45 : 1)

                    gameContext.drawStar(context, 7, scale, 0.7 * scale)
                    context.fillStyle = i ? "#b4db62" : "#9ebf57"
                    context.fill()
                    i || context.stroke()
                }
            break

            case 1:
                gameContext.drawBlob(context, 6, resource.scale, 0.7 * resource.scale)

                context.fillStyle = "#89a54c"

                context.fill()
                context.stroke()

                context.fillStyle = "#c15555"

                const angle = (Math.PI * 2) / 4

                for (let i = 0; i < 4; ++i) {
                    const scale = utils.randInt(resource.scale / 3.5, resource.scale / 2.3)

                    gameContext.drawCircle(context, scale * Math.cos(angle * i), scale * Math.sin(angle * i), utils.randInt(10, 12))
                }
            break

            case 2:
            case 3:
                const isStone = resource.resourceType === 2
                const isGold = resource.resourceType === 3

                context.fillStyle = isStone ? "#939393" : "#e0c655"

                gameContext.drawStar(context, 3, resource.scale, resource.scale)
                context.fill()
                context.stroke()

                context.fillStyle = isStone ? "#bcbcbc" : "#ebdca3"

                gameContext.drawStar(context, 3, 0.55 * resource.scale, 0.65 * resource.scale)
                context.fill()
            break
        }

        this.resources.set(id, canvas)

        return this.resources.get(id)
    }
}

export default Sprites