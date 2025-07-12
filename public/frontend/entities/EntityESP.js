import config from "../../../config.json"
import utils from "../../../utils/index.js"
import { gameContext, im } from "../const.js"

class EntityESP {
    constructor(_entity, healthBarWidthDiv) {
        this._entity = _entity
        this.healthBarWidthDiv = healthBarWidthDiv

        this.nameModel = gameContext.createText(Object.assign({
            textBaseline: "middle",
            textAlign: "center",
            lineJoin: "round",
            stroke: config.darkGeneralStroke
        }, utils.removeProto(config.nameESP)))
        this.healthBarModel = utils.removeProto(config.healthBarESP)
    }

    drawName() {
        const nickname = this._entity.isPlayer ? this._entity.nickname : this._entity.isAnimal ? this._entity.animalData.name : this._entity.name
        const offsetY = -this._entity._scale * 2
        const metrics = this.nameModel.to(this._entity, offsetY).setText(nickname).draw()
        const textHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
        
        if (this._entity.isPlayer && this._entity.isAFK) {
            this.nameModel.to(this._entity, offsetY - textHeight).setText("[AFK]").draw()
        }
    }

    drawEid() {
        const textModel = gameContext.createText({
            "font": "18px Hammersmith One",
            fill: "#ffffff",
            alpha: 1,
            stroke: config.darkGeneralStroke,
            strokeWidth: 4,
            textBaseline: "middle",
            textAlign: "center",
            lineJoin: "round"
        })

        textModel.to(this._entity).setText(this._entity.eid).draw()
    }

    drawHealthBar() {
        this.healthBarModel = utils.removeProto(config.healthBarESP)

        if (this.healthBarWidthDiv) {
            this.healthBarModel.width /= this.healthBarWidthDiv
        }

        const offsetY = this._entity._scale * 2

        gameContext.ctx.save()
        gameContext.ctx.fillStyle = config.darkGeneralStroke

        gameContext.ctx.translate(this._entity.render.x, this._entity.render.y)
        gameContext.ctx.beginPath()
        gameContext.ctx.roundRect(
            -this.healthBarModel.width - this.healthBarModel.padding, 
            offsetY, 
            this.healthBarModel.width * 2 + this.healthBarModel.padding * 2,
            this.healthBarModel.height, this.healthBarModel.radius
        )
        gameContext.ctx.fill()
        gameContext.ctx.restore()

        gameContext.ctx.save()
        gameContext.ctx.fillStyle = this.healthBarModel.fills[!this._entity.isPlayer ? 1 : this._entity.isGodmode ? 2 : this._entity.isAlly ? 0 : 1]

        gameContext.ctx.translate(this._entity.render.x, this._entity.render.y)
        gameContext.ctx.beginPath()
        gameContext.ctx.roundRect(
            -this.healthBarModel.width, 
            offsetY + this.healthBarModel.padding, 
            this.healthBarModel.width * 2 * (this._entity.health / this._entity.maxHealth),
            this.healthBarModel.height - this.healthBarModel.padding * 2, this.healthBarModel.radius - 1
        )
        gameContext.ctx.fill()
        gameContext.ctx.restore()
    }

    drawChatMessage() {
        if (!this._entity.chatMessage) return

        const hasRussiaLetters = /[\u0400-\u04FF]/.test(this._entity.chatMessage)
        const fontFamily = hasRussiaLetters ? "Ubuntu" : "Hammersmith One"

        gameContext.ctx.save()
        gameContext.ctx.font = `${hasRussiaLetters ? "30px" : "32px"} ${fontFamily}`
        gameContext.ctx.textBaseline = "middle"
        gameContext.ctx.textAlign = "center"

        const textSize = gameContext.ctx.measureText(this._entity.chatMessage)
        const textWidth = textSize.width + 17
        const textHeight = 47

        gameContext.ctx.fillStyle = "rgba(0, 0, 0, 0.2)"

        gameContext.ctx.translate(this._entity.render.x, this._entity.render.y - this._entity.scale - 90)
        gameContext.ctx.beginPath()
        gameContext.ctx.roundRect(-textWidth / 2, -textHeight / 2, textWidth, textHeight, 6)
        gameContext.ctx.fill()
        gameContext.ctx.closePath()

        gameContext.ctx.fillStyle = "#ffffff"

        gameContext.ctx.fillText(this._entity.chatMessage, 0, 0)
        gameContext.ctx.restore()
    }

    renderPlayerESP() {
        if (this._entity.isIm && !this._entity.isPlaying) return

        this.drawName()
        this.drawHealthBar()

        if (im.isAdmin) {
            this.drawEid()
        }
    }

    renderGameObjectESP() {
        if (im.isAdmin) {
            this.drawEid()
        }
    }

    renderAnimalESP() {
        this.drawName()
        this.drawHealthBar()

        if (im.isAdmin) {
            this.drawEid()
        }
    }
}

export default EntityESP