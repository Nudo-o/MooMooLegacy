import utils from "../../../utils/index.js"
import { gameObjects, network } from "../../const.js"
import Socket from "../socket/Socket.js"
import ServerSlots from "./ServerSlots.js"
import config from "../../../config.json" with { type: "json" }

class Server extends utils.Emitter {
    constructor() {
        super()

        this.slots = new ServerSlots()

        this.on("connection", this.onConnection.bind(this))
        this.on("socket-close", this.onSocketClose.bind(this))
    }

    updateSockets(delta) {
        this.slots.each((socket) => {
            if (typeof socket !== 'object') return

            if (!socket.player.isPlaying && !socket.player.isKilled) return
            
            socket.update(delta)
        })
    }

    onConnection(websocket, request) {
        const slotIndex = this.slots.getFreeSlot()
        const socket = new Socket(slotIndex, websocket, request)

        this.slots.set(slotIndex, socket)

        // if (!/moomoo-legacy/.test(request.headers.origin)) return socket.close("unknown_origin")

        const sockets = this.slots.getNotFreeSlots()
        const socketsWithThisIP = sockets.filter((_socket) => _socket.providerIP === socket.providerIP)

        if (socketsWithThisIP.length > config.ipLimit) {
            socket.close("ip_limit")
        }
    }

    onSocketClose(slotIndex) {
        const socket = this.slots.get(slotIndex)

        if (typeof socket === 'object') {
            gameObjects.removeAllGameObjectsByOwner(socket.player.eid)
            socket.player.deleteMeForAll()
        }

        network.needDestroyEntities.push(() => {
            this.slots.clearSlot(slotIndex)
        })
    }
}

export default Server