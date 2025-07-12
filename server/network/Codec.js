import Encodr from "encodr"

class Codec {
    constructor() {
        this.cbor = new Encodr("cbor")
    }

    toArrayBuffer(buffer) {
        const arrayBuffer = new ArrayBuffer(buffer.length)
        const view = new Uint8Array(arrayBuffer)

        for (let i = 0; i < buffer.length; ++i) {
            view[i] = buffer[i]
        }

        return arrayBuffer
    }
}

export default Codec