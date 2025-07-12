import Socket from "./socket/Socket.js"

class Network {
    constructor() {
        this.socket = new Socket(this)

        this.ping = 0
        this.lastPingSent = null
    }
}

export default Network