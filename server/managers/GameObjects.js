import utils from "../../utils/index.js"
import { gridArray, legacyLogger, network } from "../const.js"
import GameObject from "../entities/GameObject.js"
import Manager from "./Manager.js"
import config from "../../config.json" with { type: "json" }
import items from "../../items.json" with { type: "json" }

class GameObjects extends Manager {
    constructor() {
        super()

        this.generateResources()
    }

    generateEid() {
        const eid = utils.randInt(0, 9999)

        if (this.has(eid)) return this.generateEid()

        return eid
    }

    generateResources() {
        const mapScale = (config.map.width + config.map.height) / 2
        const trees = Math.max(1, Math.round((mapScale / config.resourcesScales.tree[3]) / 2.5))
        const bushes = Math.max(1, Math.round((mapScale / config.resourcesScales.bush[3]) / 3.5))
        const rocks = Math.max(1, Math.round((mapScale / config.resourcesScales.rock[2]) / 3.5))
        const golds = Math.max(1, Math.round((mapScale / (config.resourcesScales.gold[2] * 2)) / 10))
        const resources = [ trees, bushes, rocks, golds ]

        for (let i = 0; i < resources.length; i++) {
            for (let j = 0; j < resources[i]; j++) {
                const resourceType = i
                const cell = gridArray.getRandomFreeCell(resourceType === 2 ? "(grass|river)" : "grass")
                const x = cell.middleX
                const y = cell.middleY
                const eid = this.generateEid()

                gridArray.occupyCell(cell.id, false)

                this.addResourceObject(cell.id, eid, x, y, resourceType)
            }
        }

        this.forEach((gameObject) => {
            if (gameObject.isItem || gameObject.resourceType === 3) return

            const nearResource = this.sort((a, b) => {
                a = gameObject.distanceTo(a)
                b = gameObject.distanceTo(b)
    
                return a - b
            }, 1)

            const angle = gameObject.angleTo(nearResource)
            const distance = gameObject.distanceTo(nearResource)
            const offsetX = Math.min(gameObject.scale / 4, distance / 2) * Math.cos(angle)
            const offsetY = Math.min(gameObject.scale / 4, distance / 2) * Math.sin(angle)

            gameObject.position.add(offsetX, offsetY)
        })

        legacyLogger.emit("completing-setup", ...resources)
    }

    checkItemLocation(x, y, scale, scaleMult) {
        for (let i = 0; i < this.list.length; ++i) {
            const gameObject = this.list[i]
            const obstacleScale = gameObject.getScale(scaleMult, true)
            const distance = gameObject.distanceTo(new utils.Point(x, y))

            if (distance < (scale + obstacleScale)) return false
        }

        const riverY = config.map.height / 2 - config.biomes.river.height / 2
        const isInRiver = y >= riverY && y <= riverY + config.biomes.river.height
        const bridgeHeight = config.biomes.river.height + config.biomes.river.padding * 2 + config.bridge.paddingY * 2
        const bridgeX = config.map.width / 2 - config.bridge.width / 2 - config.bridge.paddingX
        const bridgeY = config.map.height / 2 - bridgeHeight / 2
        const isInBridge = x >= bridgeX && x <= bridgeX + config.bridge.width + config.bridge.paddingX * 2 && y >= bridgeY && y <= bridgeY + bridgeHeight

        if (isInRiver || isInBridge) {
            return false
        }

        return true
    }

    addResourceObject(cellId, eid, x, y, resourceType, offsetToNear = false) {
        if (![ 0, 1, 2, 3 ].includes(resourceType)) return

        const resourceName = resourceType === 0 ? "tree" : resourceType === 1 ? "bush" : resourceType === 2 ? "rock" : resourceType === 3 ? "gold" : 0
        const scales = config.resourcesScales[resourceName]
        const scale = scales[utils.randInt(0, scales.length - 1)]

        this.set(eid, new GameObject(cellId, eid, x, y, void 0, scale, void 0, resourceType))

        if (offsetToNear) {
            const gameObject = this.get(eid)
            const nearResource = this.sort((a, b) => {
                a = gameObject.distanceTo(a)
                b = gameObject.distanceTo(b)
    
                return a - b
            }, 1)

            const angle = gameObject.angleTo(nearResource)
            const distance = gameObject.distanceTo(nearResource)
            const offsetX = Math.min(gameObject.scale / 4, distance / 2) * Math.cos(angle)
            const offsetY = Math.min(gameObject.scale / 4, distance / 2) * Math.sin(angle)

            gameObject.position.add(offsetX, offsetY)
        }
    }

    addItemObject(eid, x, y, dir, itemData, ownerEid) {
        if (!itemData) return

        this.set(eid, new GameObject(void 0, eid, x, y, dir, itemData.scale, itemData, void 0, ownerEid))
    }

    removeAllGameObjectsByOwner(ownerEid) {
        const gameObjectsByPlayer = this.filter((gameObject) => gameObject.ownerEid === ownerEid)

        for (const gameObject of gameObjectsByPlayer) {
            this.removeGameObject(gameObject.eid)
        }
    }

    removeGameObject(eid) {
        if (!this.has(eid)) return

        network.needDestroyEntities.push(() => {
            const gameObject = this.get(eid)

            gameObject.cellId && gridArray.occupyCell(gameObject.cellId, true)
            
            this.delete(gameObject.eid)
        })
    }

    update(delta) {
        this.forEach((gameObject) => {
            gameObject.update(delta)
        })
    }
}

export default GameObjects