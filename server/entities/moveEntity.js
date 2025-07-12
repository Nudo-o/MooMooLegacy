import utils from "../../utils/index.js"
import config from "../../config.json" with { type: "json" }

function moveEntity(entity, moveDecel, delta) {
    if (entity.slowMult < 1) {
        entity.slowMult += 0.0008 * delta
        entity.slowMult > 1 && (entity.slowMult = 1)
    }

    if (entity.biome === "river") {
        if (!entity.isIgnoreWaterCurrent) {
            entity.slowMult = 0.33
        }
    
        entity.xVel += (config.biomes.river.waterCurrent / (entity.isIgnoreWaterCurrent ? 10 : 1)) * delta
    }

    if (entity.collisions.checkBridge) {
        const distance = utils.getDistance(entity.collisions._entity.x, entity.collisions._entity.y, config.map.width / 2, config.map.height / 2)

        if (distance <= config.biomes.river.height) {
            entity.collisions.collideBridgeHandrails()
        }
    }

    if (entity.isMoving) {
        let xVel = (entity.moveAngle !== null) ? Math.cos(entity.moveAngle) : 0
        let yVel = (entity.moveAngle !== null) ? Math.sin(entity.moveAngle) : 0

        const length = Math.sqrt(xVel * xVel + yVel * yVel)

        if (length != 0) {
            xVel /= length
            yVel /= length
        }

        if (xVel) entity.xVel += xVel * entity.moveSpeed * delta
        if (yVel) entity.yVel += yVel * entity.moveSpeed * delta
    }

    if (entity.isLockMovement) {
        entity.xVel = entity.yVel = 0
    }

    const tmpSpeed = utils.getDistance(0, 0, entity.xVel * delta, entity.yVel * delta)
    const depth = Math.min(4, Math.max(1, Math.round(tmpSpeed / 40)))
    const tMlt = 1 / depth

    for (let i = 0; i < depth; ++i) {
        entity.position.add(
            (entity.xVel * delta) * tMlt, 
            (entity.yVel * delta) * tMlt
        )
        entity.collisions.update(delta)
    }

    if (entity.xVel) {
        entity.xVel *= Math.pow(moveDecel, delta)

        if (entity.xVel <= 0.01 && entity.xVel >= -0.01) entity.xVel = 0
    }

    if (entity.yVel) {
        entity.yVel *= Math.pow(moveDecel, delta)

        if (entity.yVel <= 0.01 && entity.yVel >= -0.01) entity.yVel = 0
    }
}

export default moveEntity