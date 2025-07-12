import config from "../../../config.json" with { type: "json" }
import Socket from "../socket/Socket.js"

class ServerSlots {
    constructor() {
        this.slots = new Map(Array.from({ 
            length: config.maxServerSlots + 1
        }, (_, index) => [ index, index ]))
    }

    get list() {
        return [ ...this.slots.values() ]
    }

    getFreeSlot() {
        return this.list.filter((slot) => typeof slot !== 'object')[0]
    }

    getNotFreeSlots() {
        return this.list.filter((slot) => typeof slot === 'object')
    }

    clearSlot(index) {
        this.slots.set(index, index)
    }

    set(index, _socket) {
        if (typeof index !== 'number') return
        if (index < 0 || index > config.maxServerSlots) return

        this.slots.set(index, _socket)
    }

    get(index) {
        return this.slots.get(index)
    }

    each(callback) {
        this.slots.forEach(callback)
    }
}

export default ServerSlots