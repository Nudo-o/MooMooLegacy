import config from "../../config.json" with { type: "json" }
import utils from "../../utils/index.js"
import { gridArray, network } from "../const.js"

class Entity extends utils.Point {
    constructor(eid, x, y, dir, scale, maxHealth) {
        super(x, y, 0, 0)

        this.eid = eid
        this.dir = dir
        this.scale = scale
        this.health = this.maxHealth = maxHealth === "infinity" ? Infinity : maxHealth

        this.slowMult = 1
        this.speedMult = 1

        this.isUnderOfBridge = false
        this.isEnterToBridge = false
        this.isEnterToBridgeState = 0
        this.isLockMovement = false
    }

    get biome() {
        const bridgeHeight = config.biomes.river.height + config.biomes.river.padding + config.bridge.paddingY
        const bridgeStartX = config.map.width / 2 - config.bridge.width / 2
        const bridgeStartY = config.map.height / 2 - bridgeHeight / 2
        const bridgeEndX = config.map.width / 2 + config.bridge.width / 2
        const bridgeEndY = config.map.height / 2 + bridgeHeight / 2

        if (this.isEnterToBridge) {
            if (this.x >= bridgeStartX && this.x <= bridgeEndX) {
                if (this.y >= bridgeStartY && this.y <= bridgeEndY) {
                    return "bridge"
                }
            }
        }

        if (this.y >= config.map.height / 2 - config.biomes.river.height / 2) {
            if (this.y <= config.map.height / 2 + config.biomes.river.height / 2) {
                return "river"
            }
        }

        return "grass"
    }

    setRandomPosition(biomeName, isRandom) {
        const freeCell = gridArray.getRandomFreeCell(biomeName)
        const randomPositionInCell = isRandom ? freeCell.getRandomInnerPosition() : { x: freeCell.middleX, y: freeCell.middleY }

        this.setTo(randomPositionInCell.x, randomPositionInCell.y)
    }

    setScale(_scale) {
        this.scale = Math.max(10, _scale)
    }

    setHealth(_health) {
        this.health = Math.max(0, Math.min(_health, this.maxHealth))
    }

    isCanSee(other) {
        if (!other) return false

        const dx = Math.abs(other.x - this.x) - other.scale
        const dy = Math.abs(other.y - this.y) - other.scale

        return dx <= (config.viewport.width / 2) * 1.3 && dy <= (config.viewport.height / 2) * 1.3
    }

    sendToSocketsWhoSeeMe(callback) {
        const sockets = network.server.slots.getNotFreeSlots()

        for (const socket of sockets) {
            if (!socket.player) {
                socket.player = socket
            }

            if (!socket.player.isCanSee(this)) continue

            callback(socket)
        }

        const killedSockets = sockets.filter((socket) => socket.player.isKilled)

        for (const killedSocket of killedSockets) {
            if (!killedSocket.player.isCanSee(this)) continue

            callback(killedSocket)
        }
    }
}

export default Entity