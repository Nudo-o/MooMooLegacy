import Vector from "../../../utils/2d/Vector.js"
import utils from "../../../utils/index.js"
import { camera, players } from "../const.js"
import config from "../../../config.json"

class Entity extends utils.Point {
    constructor(eid, x, y, dir, scale, health, maxHealth) {
        super(x, y, 0, 0)

        this.eid = eid
        this.dir = dir
        this.additionalDir = 0
        this.scale = scale
        this._scale = this.scale
        this.health = health
        this.maxHealth = maxHealth

        this.renderLayer = 0

        this.updateRate = 0
        this.updateTime = null
        this.oldUpdateTime = null

        this.tickDir = this.dir
        this.oldTickDir = this.dir

        this.tickPosition = new Vector(this.x, this.y)
        this.oldTickPosition = new Vector(this.x, this.y)
    }

    get render() {
        return {
            x: this.x - camera.xOffset,
            y: this.y - camera.yOffset
        }
    }

    get biome() {
        const bridgeHeight = config.biomes.river.height + config.biomes.river.padding + config.bridge.paddingY
        const bridgeStartX = config.map.width / 2 - config.bridge.width / 2
        const bridgeStartY = config.map.height / 2 - bridgeHeight / 2
        const bridgeEndX = config.map.width / 2 + config.bridge.width / 2
        const bridgeEndY = config.map.height / 2 + bridgeHeight / 2

        if (this.x >= bridgeStartX && this.x <= bridgeEndX) {
            if (this.y >= bridgeStartY && this.y <= bridgeEndY) {
                return "bridge"
            }
        }

        if (this.y >= config.map.height / 2 - config.biomes.river.height / 2) {
            if (this.y <= config.map.height / 2 + config.biomes.river.height / 2) {
                return "river"
            }
        }

        return "grass"
    }

    setScale(_scale) {
        if (typeof _scale !== 'number') return

        this.scale = _scale
    }

    setPosition(x, y) {
        this.setTo(x, y)
        this.tickPosition = new Vector(this.x, this.y)
        this.oldTickPosition = new Vector(this.x, this.y)
    }

    setEid(_eid) {
        if (typeof _eid !== 'number') return

        this.eid = _eid

        players.delete(null)
        players.set(this.eid, this)
    }

    setHealth(_health) {
        this.health = _health
    }

    isCanSee(other) {
        if (!other) return false

        const dx = Math.abs(other.x - this.x) - other.scale
        const dy = Math.abs(other.y - this.y) - other.scale

        return dx <= (config.viewport.width / 2) * 1.3 && dy <= (config.viewport.height / 2) * 1.3
    }
}

export default Entity