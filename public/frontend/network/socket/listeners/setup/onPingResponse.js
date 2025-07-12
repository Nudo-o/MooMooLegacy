import { network } from "../../../../const.js"

function onPingResponse() {
    network.ping = Date.now() - network.lastPingSent
}

export default onPingResponse