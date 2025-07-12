import Codec from "./Codec.js"
import Server from "./server/Server.js"
import utils from "../../utils/index.js"
import config from "../../config.json" with { type: "json" }
import { animals, gameObjects } from "../const.js"

class Network {
    constructor() {
        this.codec = new Codec()
        this.server = new Server()

        this.tickUpdating = true
        this.tickRate = 1000 / config.tickRateDiv
        this.ticks = 0

        this.delta = 0
        this.nowUpdateSockets = 0
        this.lastUpdateSockets = Date.now()

        this.needDestroyEntities = []

        this.startTicker()
    }

    async startTicker() {
        while (this.tickUpdating) {
            await utils.wait(this.tickRate)

            this.nowUpdateSockets = Date.now()
            this.delta = this.nowUpdateSockets - this.lastUpdateSockets
            this.lastUpdateSockets = this.nowUpdateSockets

            gameObjects.update(this.delta)
            animals.update(this.delta)
            this.server.updateSockets(this.delta)

            for (const destroy of this.needDestroyEntities) {
                destroy()
            }

            this.needDestroyEntities = []

            this.ticks += 1
        }
    }
}

export default Network