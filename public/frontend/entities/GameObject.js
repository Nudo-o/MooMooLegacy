import { camera, gameContext, im, renderer, sprites } from "../const.js"
import Entity from "./Entity.js"
import EntityESP from "./EntityESP.js"
import items from "../../../items.json"
import config from "../../../config.json"
import utils from "../../../utils/index.js"

class GameObject extends Entity {
    constructor(eid, x, y, dir, scale, itemData, resourceType) {
        super(eid, x, y, dir, scale)

        this.itemData = itemData
        this.resourceType = resourceType

        this.isItem = typeof this.itemData !== 'undefined'

        this.xWiggle = this.yWiggle = 0

        this.sprite = this.isItem ? sprites.getItemSprite(this) : sprites.getResourceSprite(this)

        this.renderLayer = this.itemData?.lowLayer ? 0 : 1

        this.esp = new EntityESP(this)
    }
    
    doWiggle(power, angle) {
        this.xWiggle = power * Math.cos(angle)
        this.yWiggle = power * Math.sin(angle)
    }

    update() {
        this.xWiggle && (this.xWiggle *= Math.pow(0.99, renderer.delta))
        this.yWiggle && (this.yWiggle *= Math.pow(0.99, renderer.delta))

        if (this.itemData?.turnSpeed) {
            this.dir += this.itemData.turnSpeed * renderer.delta
        } 
        
        gameContext.ctx.save()
        if (this.isItem) {
            if (items.groups[this.itemData.groupId].name === "traps") {
                gameContext.ctx.globalAlpha = 0.6
            }
        }

        gameContext.ctx.translate(this.render.x + this.xWiggle, this.render.y + this.yWiggle)
        gameContext.ctx.rotate(this.dir || 0)
        gameContext.ctx.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2)
        gameContext.ctx.restore()

        this.updatePhysics()
    }
}

export default GameObject