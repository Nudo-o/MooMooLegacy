import { network } from "../../const.js"
import Player from "../../entities/Player.js"
import SocketAdapter from "./SocketAdapter.js"
import SocketListener from "./SocketListener.js"
import SocketUpdater from "./SocketUpdater.js"

class Socket extends SocketAdapter {
    constructor(_socketId, websocket, request) {
        super()

        this.socketId = _socketId
        this.webSocket = websocket
        this.providerIP = request?.headers["x-forwarded-for"] || request?.socket.remoteAddress

        this.player = new Player(this)
        this.listener = new SocketListener(this)
        this.updater = new SocketUpdater(this)

        this.setSocket(this)
        
        if (this.webSocket) {
            this.webSocket.on("message", this.onMessage.bind(this))
            this.webSocket.on("close", this.onClose.bind(this))
        }
        
        this.sendSetup()
    }

    get isReady() {
        return this.webSocket?.readyState === 1
    }

    send(packet, ...data) {
        if (!this.isReady) return

        const binary = network.codec.cbor.encode([ packet, data ])

        this.webSocket.send(binary)
    }

    onMessage(message) {
        try {
            message = network.codec.toArrayBuffer(message)

            const decoded = network.codec.cbor.decode(message)
            const [ packet, data ] = decoded
    
            if (typeof this.listener.listeners[packet] === 'function') {
                this.listener.listeners[packet](...data)
            }
        } catch (e){ console.log(e) }
    }

    onClose() {
        network.server.emit("socket-close", this.socketId)
    }

    close(reason) {
        this.webSocket.close(4444, reason || "")
    }

    update(delta) {
        if (!this.isReady) return

        this.updater.update()
    }
}

export default Socket