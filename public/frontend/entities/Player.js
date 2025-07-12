import Entity from "./Entity.js"
import config from "../../../config.json"
import items from "../../../items.json"
import { gameContext, im, images, renderer, sprites } from "../const.js"
import EntityESP from "./EntityESP.js"
import Blink from "../effects/Blink.js"
import utils from "../../../utils/index.js"

const { player } = config
const defaultStyleSheet = {
    stroke: config.generalStroke,
    strokeWidth: config.generalStrokeWidth
}

class Player extends Entity {
    constructor(eid, nickname, x, y, dir, scale, skinIndex, isAdmin, health, maxHealth, isGodmode, isDeveloper) {
        super(eid, x, y, dir, scale || player.scale, health, maxHealth)

        this.nickname = nickname
        this.skinIndex = skinIndex
        this.isAdmin = isAdmin
        this.isGodmode = isGodmode
        this.isDeveloper = isDeveloper

        const styleSheet = Object.assign(utils.removeProto(defaultStyleSheet), { 
            fill: player.fills[this.skinIndex]
        })
        
        this.bodyModel = gameContext.createCircle(styleSheet)
        this.bodyDamageModel = gameContext.createCircle(utils.removeProto(defaultStyleSheet))
        this.leftHandModel = gameContext.createCircle(styleSheet)
        this.leftHandDamageModel = gameContext.createCircle(utils.removeProto(defaultStyleSheet))
        this.rightHandModel = gameContext.createCircle(styleSheet)
        this.rightHandDamageModel = gameContext.createCircle(utils.removeProto(defaultStyleSheet))

        this.inventory = config.startInventory
        this.weaponIndex = this.inventory.weapons[0]
        this.itemIndex = -1
        this.itemsCount = {}
        this.hatIndex = -1
        this.hats = {}
        this.resources = {}

        for (const hat of items.hats) {
            if (hat.cost !== 0) continue

            this.hats[hat.id] = true
        }

        this.age = 1
        this.xp = 0
        this.maxXp = 300

        this.chatMessage = ""
        this.chatMessageTimer = 0

        this.isAttackAnimation = false
        this.attackAnimationTimer = 0
        this.attackAnimationRatio = 0
        this.attackAnimationIndex = 0
        this.attackAnimationTargetAngle = 0

        this.lastDamage = null

        this.isLockWatchDir = false
        this.isPlaying = false
        this.isKilled = false
        this.isPlayer = true
        this.isAFK = false

        this.esp = new EntityESP(this)
    }

    get isIm() {
        return this.eid === im.eid
    }

    get weapon() {
        return items.weapons[this.weaponIndex]
    }

    get item() {
        return items.items[this.itemIndex]
    }

    get hat() {
        return items.hats[this.hatIndex]
    }

    get isAlly() {
        return this.isIm
    }

    get renderDir() {
        return (this.isIm ? this.mouseAngle : this.dir) + this.additionalDir
    }

    setResource(type, value) {
        this.resources[type] = value
    }

    recreateModels() {
        const styleSheet = Object.assign(utils.removeProto(defaultStyleSheet), { 
            fill: player.fills[this.skinIndex]
        })
        
        this.bodyModel = gameContext.createCircle(styleSheet)
        this.bodyDamageModel = gameContext.createCircle(utils.removeProto(defaultStyleSheet))
        this.leftHandModel = gameContext.createCircle(styleSheet)
        this.leftHandDamageModel = gameContext.createCircle(utils.removeProto(defaultStyleSheet))
        this.rightHandModel = gameContext.createCircle(styleSheet)
        this.rightHandDamageModel = gameContext.createCircle(utils.removeProto(defaultStyleSheet))
    }

    renderHand(side, model, size) {
        const offsetX = this.scale * Math.cos((Math.PI / 4) * (side === "left" ? 1 : -1))
        const offsetY = this.scale * Math.sin((Math.PI / 4) * (side === "left" ? 1 : -1))

        model.to(this, [ offsetX, offsetY ]).setRotate(this.renderDir).setRadius(size).draw()

        if (this.lastDamage !== null) {
            const alpha = Math.min(1, Math.max(this.lastDamage / player.damageTime, 0))

            model = this[side === "left" ? "leftHandDamageModel" : "rightHandDamageModel"]

            model.to(this, [ offsetX, offsetY ]).setStyle("fill", player.damageFill).setStyle("alpha", alpha || 0).setRotate(this.renderDir).setRadius(size).draw()
        }
    }

    renderHands() {
        const leftHandScale = this.scale === player.scale ? player.leftHandScale : this.scale / 3
        const rightHandScale = this.scale === player.scale ? player.leftHandScale : this.scale / 3

        this.renderHand("left", this.leftHandModel, leftHandScale)
        this.renderHand("right", this.rightHandModel, rightHandScale)
    }

    renderWeapon() {
        const weaponSprite = sprites.getWeaponSprite(this.weaponIndex, this.scale === player.scale ? player.scale : this.scale, 0)

        gameContext.ctx.save()
        gameContext.ctx.translate(this.render.x, this.render.y)
        gameContext.ctx.rotate(this.renderDir)
        gameContext.ctx.drawImage(weaponSprite, -weaponSprite.width / 2, -weaponSprite.height / 2)
        gameContext.ctx.restore()
    }

    renderItem() {
        const itemSprite = sprites.getItemSprite(this.item)

        gameContext.ctx.save()
        gameContext.ctx.translate(this.render.x, this.render.y)
        gameContext.ctx.rotate(this.renderDir)
        gameContext.ctx.drawImage(itemSprite, this.scale - this.item.holdOffset, -itemSprite.width / 2)
        gameContext.ctx.restore()
    }

    renderHat() {
        if (!this.hat) return

        const hatImage = images.get(this.hat.src)

        if (!hatImage.isLoaded) return

        gameContext.ctx.save()
        gameContext.ctx.translate(this.render.x, this.render.y)
        gameContext.ctx.rotate(this.renderDir)
        gameContext.ctx.rotate(Math.PI / 2)
        gameContext.ctx.drawImage(hatImage, -this.hat.scale / 2, -this.hat.scale / 2, this.hat.scale, this.hat.scale)
        gameContext.ctx.restore()
    }

    renderBody() {
        this.bodyModel.to(this).setRadius(this.scale).draw()

        if (this.lastDamage) {
            const alpha = Math.min(1, Math.max(this.lastDamage / player.damageTime, 0))

            this.bodyDamageModel.to(this).setStyle("fill", player.damageFill).setStyle("alpha", alpha).setRadius(this.scale).draw()
        }
    }

    startAttackAnimation(isDidHit) {
        this.isAttackAnimation = true
        this.attackAnimationTimer = this.weapon.speed
        this.attackAnimationRatio = this.attackAnimationIndex = 0
        this.attackAnimationTargetAngle = -(isDidHit ? config.hitAngle : Math.PI)
    }

    updateAttackAnimation() {
        if (this.attackAnimationTimer <= 0) return (this.isAttackAnimation = false)

        this.attackAnimationTimer -= renderer.delta

        if (this.attackAnimationIndex === 0) {
            this.attackAnimationRatio += renderer.delta / (this.weapon.speed * config.hitReturnRatio)
            this.additionalDir = utils.lerp(0, this.attackAnimationTargetAngle, Math.min(1, this.attackAnimationRatio))

            if (this.attackAnimationRatio >= 1) {
                this.attackAnimationRatio = this.attackAnimationIndex = 1
            }

            return
        }

        this.attackAnimationRatio -= renderer.delta / (this.weapon.speed * (1 - config.hitReturnRatio))
        this.additionalDir = utils.lerp(0, this.attackAnimationTargetAngle, Math.max(0, this.attackAnimationRatio))
    }

    update() {
        if (this.isIm && !this.isPlaying) return

        if (this.chatMessageTimer > 0) {
            this.chatMessageTimer -= renderer.delta
        } else {
            this.chatMessage = ""
            this.chatMessageTimer = 0
        }

        if (this.adminBlink && this.isDeveloper) {
            if (!this.adminBlink.isMoreEffects) {
                delete this.adminBlink
            }
        }

        if (this.isAdmin && !this.adminBlink) {
            this.adminBlink = new Blink(this, this.isDeveloper ? "#0b066f" : "#6f0606", 1, this.scale * 1.5, this.isDeveloper)
        } else if (!this.isAdmin && this.adminBlink) {
            delete this.adminBlink
        }

        this.adminBlink && this.adminBlink.render()

        if (this.isAttackAnimation) {
            this.updateAttackAnimation()
        }

        if (this.lastDamage > 0) {
            this.lastDamage -= renderer.delta
            this.lastDamage = Math.min(Math.max(this.lastDamage, 0), player.damageTime)
        } else {
            this.lastDamage = null
        }
        
        this.itemIndex === -1 && this.renderWeapon()
        this.renderHands()
        this.itemIndex !== -1 && this.renderItem()
        this.renderBody()
        this.renderHat()
    }
}

export default Player