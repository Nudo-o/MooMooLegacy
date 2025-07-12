import utils from "../../utils/index.js"
import Manager from "./Manager.js"
import config from "../../config.json" with { type: "json" }
import items from "../../items.json" with { type: "json" }
import Animal from "../entities/Animal.js"
import { network } from "../const.js"

class Animals extends Manager {
    constructor() {
        super()

        this.defaultAnimalsSpawnDelay = 30000
        this.defaultAnimalsSpawnTimer = this.defaultAnimalsSpawnDelay
    }

    get list() {
        return [ ...this.values() ]
    }

    getAnimalsById(animalId) {
        return this.list.filter((animal) => animal.animalId === animalId)
    }

    generateEid() {
        const eid = utils.randInt(0, 100)

        if (this.has(eid)) return this.generateEid()

        return eid
    }

    addAnimal(eid, animalId) {
        if (![ 0 ].includes(animalId)) return

        this.set(eid, new Animal(eid, animalId))
    }

    removeAnimal(eid) {
        if (!this.has(eid)) return
        
        network.needDestroyEntities.push(() => {
            this.delete(eid)
        })
    }

    update(delta) {
        if (this.defaultAnimalsSpawnTimer > 0) {
            this.defaultAnimalsSpawnTimer -= delta
        } else {
            for (const animalData of items.animals) {
                const animals = this.getAnimalsById(animalData.id)

                if (animals.length >= animalData.maxEntities) continue

                const eid = this.generateEid()

                this.addAnimal(eid, animalData.id)
            }

            this.defaultAnimalsSpawnTimer = this.defaultAnimalsSpawnDelay
        }

        this.forEach((animal) => {
            animal.update(delta)
        })
    }
}

export default Animals