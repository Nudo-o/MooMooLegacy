import layers from "../renders/layers.json"
import { renderer } from "../const.js"
import items from "../../../items.json"
import Animal from "../entities/Animal.js"
import Entities from "./Entities.js"

class Animals extends Entities {
    constructor() {
        super()

        renderer.add(layers.animalsESPLow.layer, {
            id: layers.animalsESPLow.id,
            _function: this.renderAnimalsESP.bind(this, 0)
        })

        renderer.add(layers.animalsESPHigh.layer, {
            id: layers.animalsESPHigh.id,
            _function: this.renderAnimalsESP.bind(this, 1)
        })

        renderer.add(layers.animalsLow.layer, {
            id: layers.animalsLow.id,
            _function: this.update.bind(this, 0)
        })

        renderer.add(layers.animalsHigh.layer, {
            id: layers.animalsHigh.id,
            _function: this.update.bind(this, 1)
        })
    }

    addAnimal(eid, animalId, x, y, dir, health) {
        const animalData = items.animals[animalId]

        this.set(eid, new Animal(eid, x, y, dir, health, animalData))
    }

    renderAnimalsESP(renderLayer) {
        this.each((_animal) => {
            if (!_animal.esp) return
            if (renderLayer !== ([ 0, 2 ].includes(_animal.renderLayer) ? 1 : 0)) return

            _animal.esp.renderAnimalESP()
        })
    }

    update(renderLayer) {
        this.interpolateEntities((_animal) => ([ 0, 2 ].includes(_animal.renderLayer) ? 1 : 0) === renderLayer, (_animal) => _animal.update())
    }
}

export default Animals