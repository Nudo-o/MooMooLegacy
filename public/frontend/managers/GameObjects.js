import Manager from "./Manager.js"
import layers from "../renders/layers.json"
import { renderer } from "../const.js"
import GameObject from "../entities/GameObject.js"
import config from "../../../config.json"
import items from "../../../items.json"
import utils from "../../../utils/index.js"

class GameObjects extends Manager {
    constructor() {
        super()

        renderer.add(layers.gameObjetsLow.layer, {
            id: layers.gameObjetsLow.id,
            _function: this.update.bind(this, 0)
        })

        renderer.add(layers.gameObjetsHigh.layer, {
            id: layers.gameObjetsHigh.id,
            _function: this.update.bind(this, 1)
        })

        renderer.add(layers.golds.layer, {
            id: layers.golds.id,
            _function: this.updateResource.bind(this, 3)
        })

        renderer.add(layers.stones.layer, {
            id: layers.stones.id,
            _function: this.updateResource.bind(this, 2)
        })

        renderer.add(layers.foods.layer, {
            id: layers.foods.id,
            _function: this.updateResource.bind(this, 1)
        })

        renderer.add(layers.trees.layer, {
            id: layers.trees.id,
            _function: this.updateResource.bind(this, 0)
        })

        renderer.add(layers.gameObjectsESP.layer, {
            id: layers.gameObjectsESP.id,
            _function: this.renderGameObjectsESP.bind(this)
        })

        this.createBackgroundGameObjects()
    }

    createBackgroundGameObjects() {
        const middleX = config.map.width / 2
        const middleY = config.map.height / 2

        this.addResourceObject(0, 0, middleX, middleY + 200, config.resourcesScales.tree[3])
        this.addResourceObject(1, 0, middleX, middleY - 480, config.resourcesScales.tree[3])
        this.addResourceObject(2, 0, middleX + 300, middleY + 450, config.resourcesScales.tree[3])
        this.addResourceObject(3, 0, middleX - 950, middleY - 130, config.resourcesScales.tree[2])
        this.addResourceObject(4, 0, middleX - 750, middleY - 400, config.resourcesScales.tree[3])
        this.addResourceObject(5, 0, middleX - 700, middleY + 400, config.resourcesScales.tree[2])
        this.addResourceObject(6, 0, middleX + 800, middleY - 200, config.resourcesScales.tree[3])
        this.addResourceObject(7, 1, middleX - 260, middleY + 340, config.resourcesScales.bush[3])
        this.addResourceObject(8, 1, middleX + 760, middleY + 310, config.resourcesScales.bush[3])
        this.addResourceObject(9, 1, middleX - 800, middleY + 100, config.resourcesScales.bush[3])
        this.addItemObject(10, 6, middleX - 800, middleX + 300, utils.randAngle())
        this.addItemObject(11, 6, middleX + 650, middleX - 390, utils.randAngle())
        this.addResourceObject(12, 2, middleX - 400, middleY - 450, config.resourcesScales.rock[2])
    }

    addResourceObject(eid, resourceType, x, y, scale) {
        this.set(eid, new GameObject(eid, x, y, void 0, scale, void 0, resourceType))
    }

    addItemObject(eid, itemId, x, y, dir) {
        const itemData = items.items[itemId]

        this.set(eid, new GameObject(eid, x, y, dir, itemData.scale, itemData, void 0))
    }

    updateResource(resourceType) {
        this.forEach((gameObject) => {
            if (gameObject.isItem || gameObject.resourceType !== resourceType) return

            gameObject.update()
        })
    }

    renderGameObjectsESP() {
        this.each((gameObject) => {
            if (!gameObject.esp) return

            gameObject.esp.renderGameObjectESP()
        })
    }

    update(renderLayer) {
        this.forEach((gameObject) => {
            if (!gameObject.isItem || gameObject.renderLayer !== renderLayer) return

            gameObject.update()
        })
    }
}

export default GameObjects