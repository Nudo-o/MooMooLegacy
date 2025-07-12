import { gameObjects, network } from "../const.js"
import Entity from "./Entity.js"
import items from "../../items.json" with { type: "json" }
import config from "../../config.json" with { type: "json" }

class GameObject extends Entity {
    constructor(cellId, eid, x, y, dir, scale, itemData, resourceType, ownerEid) {
        super(eid, x, y, dir, scale, itemData?.maxHealth)

        this.cellId = cellId
        this.itemData = itemData
        this.resourceType = resourceType
        this.ownerEid = ownerEid

        this.isKilled = false
        this.isItem = typeof this.itemData !== 'undefined'
        this.isIgnoreCollisions = this.itemData?.ignoreCollisions

        if (this.isItem) {
            if (items.groups[this.itemData.groupId].name === "traps") {
                this.isHideFromEnemies = true
            }
        }
    }

    get groupData() {
        return items.groups[this.itemData.groupId]
    }

    get damage() {
        if (!this.itemData) return

        return this.itemData.damage
    }

    get owner() {
        return network.server.slots.get(this.ownerEid)?.player
    }

    isVisibleToPlayer(player) {
        return !(this.isHideFromEnemies) || (this.owner?.eid === player.eid)
    }

    getInitData() {
        if (this.isItem) {
            return [
                this.isItem,
                this.eid,
                this.itemData.id,
                this.x,
                this.y,
                this.dir
            ]
        }

        return [
            this.isItem,
            this.eid,
            this.resourceType,
            this.x,
            this.y,
            this.scale
        ]
    }

    getScale(scaleMult, ig) {
        return this.scale * (((this.isItem || [ 2, 3, 4, 5 ].includes(this.resourceType)) ? 1 : (0.6 * (scaleMult || 1))) * (ig ? 1 : (this.itemData?.collisionDiv || 1)))
    }

    doWiggle(angle) {
        this.sendToSocketsWhoSeeMe((socket) => {
            socket.sendGameObjectWiggle(this.eid, angle)
        })
    }

    changeHealth(amount, doer) {
        if (amount === 0) return

        const newHealth = this.health + amount

        this.setHealth(newHealth)

        if (this.health <= 0) this.kill(doer)
    }

    kill(doer) {
        if (typeof this.owner === 'object') {
            if (this.isItem) {
                if (this.groupData?.name === "windmills") {
                    this.owner.amountWindmillsGold -= this.itemData.goldPerSecond
                }
            
                this.owner.setItemCount(this.itemData.groupId, -1)
            }
        }

        doer && doer.useResources(this.itemData, true)
        gameObjects.removeGameObject(this.eid)

        this.isKilled = true
    }

    update(delta) {
        this.updatePhysics()
    }
}

export default GameObject