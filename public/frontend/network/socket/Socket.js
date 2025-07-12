import { im, ui } from "../../const.js"
import SocketAdapter from "./SocketAdapter.js"
import Encodr from "encodr"

const WS_PROTOCOL = `ws${location.protocol.slice(4).split(":")[0]}`
const WS_URL = `${WS_PROTOCOL}://${location.host}/socket`
const CBOR = new Encodr("cbor")
const closeReasons = {
    "ip_limit": "You have reached the connection limit",
    "unknown_origin": "Using a third-party Origin"
}

window.WebSocket = class extends WebSocket {
    constructor(...args) {
        if (WebSocket.instance) return false

        super(...args)

        WebSocket.instance = this
    }
}

class Socket extends SocketAdapter {
    constructor() {
        if (Socket.instance) return Socket.instance

        super()

        this.webSocket = null
        this.socketId = null
        this.lastSentWatchAngle = null
        
        this.on("connection", () => {
            this.webSocket.addEventListener("message", (event) => {
                const decoded = CBOR.decode(event.data)
                const [ packet, data ] = decoded

                this.emit("message", packet, data)
            })

            this.webSocket.addEventListener("close", (event) => {
                this.emit("disconnect", event)
            })
        })
        this.on("message", this.onMessage.bind(this))
        this.on("disconnect", this.onClose.bind(this))
        this.setSocket(this)

        Socket.instance = this
    }

    get isReady() {
        return this.webSocket?.readyState === 1
    }

    setSocketId(_socketId) {
        this.socketId = _socketId

        im.setEid(this.socketId)
    }

    send(packet, ...data) {
        if (!this.isReady) return

        const binary = CBOR.encode([ packet, data ])

        this.webSocket.send(binary)
    }

    onMessage(packet, data) {
        this._callPacketListeners(packet, data)
    }

    onClose(event) {
        const reason = closeReasons[event.reason] || event.reason || "Disconnected"

        ui.emit("show-disconnect", reason)
    }

    connect() {
        if (this.isReady) return

        return new Promise((resolve) => {
            this.webSocket = new WebSocket(WS_URL)
            this.webSocket.binaryType = "arraybuffer"

            this.webSocket.onopen = () => {
                resolve()

                this.emit("connection")
            }
        })
    }
}

export default Socket