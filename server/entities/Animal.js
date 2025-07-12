import Entity from "./Entity.js"
import config from "../../config.json" with { type: "json" }
import items from "../../items.json" with { type: "json" }
import Collisions from "./Collisions.js"
import moveEntity from "./moveEntity.js"
import { animals } from "../const.js"
import utils from "../../utils/index.js"


class Animal extends Entity {
    constructor(eid, animalId) {
        const animalData = items.animals[animalId]

        super(eid, -999999, -999999, 0, animalData.scale, animalData.maxHealth)

        this.animalId = animalId
        this.animalData = animalData

        this._moveSpeed = this.animalData.moveSpeed
        this.xVel = 0
        this.yVel = 0

        this.walk = {
            targetPos: void 0,
            targetAngle: utils.randAngle(),
            needReverseAngle: false,
            isReversedAngle: false,
            runFrom: void 0,
            moveTimer: 0,
            chillTimer: 500
        }

        this.isAnimal = true
        this.isIgnoreWaterCurrent = this.animalData.ignoreWaterCurrent
        this.isOnlyRiverWalk = this.animalData.onlyRiverWalk
        this.isCantBoosting = this.animalData.cantBoosting

        this.collisions = new Collisions(this, {
            checkGameMap: true,
            checkPlayers: false,
            checkGameObjects: true,
            checkBridge: true
        })

        this.spawn()
    }

    get damage() {
        return this.animalData.damage || 0
    }

    get moveSpeed() {
        return (
            this._moveSpeed * 
            this.speedMult
        ) * this.slowMult
    }

    getInitData() {
        return [
            this.eid,
            this.animalId,
            this.x,
            this.y,
            this.dir,
            this.health,
        ]
    }

    getUpdateData() {
        return [
            this.eid,
            this.x,
            this.y,
            this.dir,
            this.isUnderOfBridge ? 1 : this.isEnterToBridge ? 2 : 0
        ]
    }

    setDir(_dir) {
        this.dir = _dir
    }

    setMoveAngle(_moveAngle) {
        this.moveAngle = _moveAngle
    }

    changeHealth(amount, isShowFadeText, doer) {
        if (amount === 0) return

        if (amount < 0 && this.animalData.isPassive) {
            this.walk.runFrom = doer
            this.walk.moveTimer = utils.randInt(4000, 10000)
            this.walk.chillTimer = 0
        }

        const oldHealth = Math.round(this.health)
        const newHealth = Math.round(this.health + amount)

        this.setHealth(newHealth)

        this.sendToSocketsWhoSeeMe((socket) => {
            socket.sendChangeHealth(this.eid, this.health, isShowFadeText || false, true)
        })

        if (this.health <= 0) this.kill(doer)

        return Math.abs(newHealth - oldHealth)
    }

    doHitPush(angle) {
        const speed = 0.3 * this.animalData.weightMult

        this.xVel += speed * Math.cos(angle)
        this.yVel += speed * Math.sin(angle)
    }

    spawn() {
        this.setRandomPosition(this.animalData.spawnBiome)

        this.health = this.maxHealth
        this.xVel = this.yVel = 0
        this.slowMult = 1

        this.resetPhysics()
    }

    kill(doer) {
        doer && doer.useResources(this.animalData, true)
        doer && doer.changeXp(this.animalData.xpForKill)

        this.sendToSocketsWhoSeeMe((socket) => {
            socket.sendRemoveAnimal(this.eid)
        })

        animals.removeAnimal(this.eid)
    }

    offsetDir(delta, targetAngle, turnSpeed) {
        if (this.dir != targetAngle) {
            this.dir %= (Math.PI * 2)

            const netAngle = ((this.dir - targetAngle) + Math.PI * 2) % (Math.PI * 2)
            const amnt = Math.min(Math.abs(netAngle - Math.PI * 2), netAngle, turnSpeed * delta)
            const sign = (netAngle - Math.PI) >= 0 ? 1 : -1

            this.dir += (sign * amnt) + Math.PI * 2
        }

        this.dir %= (Math.PI * 2)
    }

    behaviour(delta) {
        this.speedMult = 1

        if (this.walk.chillTimer > 0) {
            this.walk.chillTimer -= delta

            if (this.walk.chillTimer <= 0) {
                this.walk.chillTimer = 0
                this.walk.needReverseAngle = false
                this.walk.isReversedAngle = false
                this.walk.moveTimer = utils.randInt(4000, 10000)
                this.walk.targetAngle = utils.randAngle()
                this.walk.targetPos = true
            }
        } else if (this.walk.moveTimer > 0) {
            this.walk.moveTimer -= delta

            if (/fish/.test(this.animalData.name.toLowerCase())) {
                const riverY = config.map.height / 2 - config.biomes.river.height / 2
                const distanceToUp = Math.hypot(this.y - riverY) - this.scale
                const distanceToDown = Math.hypot(this.y - (riverY + config.biomes.river.height)) - this.scale

                if (this.y <= riverY) {
                    this.y = riverY
                    this.walk.needReverseAngle = 1
                } else if (this.y >= riverY + config.biomes.river.height) {
                    this.y = riverY + config.biomes.river.height
                    this.walk.needReverseAngle = 2
                } else {
                    if (this.walk.needReverseAngle === 1 && distanceToUp > this.scale) {
                        this.walk.needReverseAngle = false
                        this.walk.isReversedAngle = false
                    }

                    if (this.walk.needReverseAngle === 2 && distanceToDown > this.scale) {
                        this.walk.needReverseAngle = false
                        this.walk.isReversedAngle = false
                    }
                }

                if (this.walk.needReverseAngle && !this.walk.isReversedAngle) {
                    this.walk.targetAngle = -this.walk.targetAngle
                    this.walk.isReversedAngle = true
                }

                if (this.walk.runFrom?.isPlayer) {
                    if (this.walk.targetPos) {
                        this.walk.targetPos = void 0
                        this.walk.targetAngle = this.walk.runFrom.angleTo(this)
                    }
    
                    this.speedMult = 1.42
                }
            } else if (this.walk.runFrom?.isPlayer) {
                this.walk.targetAngle = this.walk.runFrom.angleTo(this)
                this.speedMult = 1.42
            }

            this.offsetDir(delta, this.walk.targetAngle, this.animalData.turnSpeed)
            this.xVel += (this.moveSpeed * delta) * Math.cos(this.dir)
            this.yVel += (this.moveSpeed * delta) * Math.sin(this.dir)

            if (this.walk.moveTimer <= 0) {
                this.walk.moveTimer = 0
                this.walk.runFrom = void 0
                this.walk.targetPos = void 0
                this.walk.chillTimer = utils.randInt(1500, 6000)
            }
        }
    }

    update(delta) {
        this.behaviour(delta)
        moveEntity(this, config.animals.moveDecel, delta)
        this.updatePhysics()
    }
}

export default Animal