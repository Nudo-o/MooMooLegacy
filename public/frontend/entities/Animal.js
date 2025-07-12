import { gameContext, images } from "../const.js"
import Entity from "./Entity.js"
import EntityESP from "./EntityESP.js"

class Animal extends Entity {
    constructor(eid, x, y, dir, health, animalData) {
        super(eid, x, y, dir, animalData.scale, health, animalData.maxHealth)

        this.animalId = animalData.id
        this.animalData = animalData

        this.isAnimal = true

        this.sprite = images.get(this.animalData.src)
        
        this.esp = new EntityESP(this, this.animalData.healthbarWidthDiv)
    }

    update() {
        if (!this.sprite.isLoaded) return

        const renderSize = this.scale * 1.2 * (this.animalData.spriteSizeMult || 1)

        gameContext.ctx.save()
        gameContext.ctx.translate(this.render.x, this.render.y)
        gameContext.ctx.rotate(this.dir - Math.PI / 2)
        gameContext.ctx.drawImage(this.sprite, -renderSize, -renderSize, renderSize * 2, renderSize * 2)
        gameContext.ctx.restore()
    }
}

export default Animal