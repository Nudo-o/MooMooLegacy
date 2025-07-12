import { players } from "../../../../const.js"
import config from "../../../../../../config.json"

function onReceiveChatMessage(eid, message) {
    const player = players.get(eid)

    if (!player) return

    player.chatMessage = message
    player.chatMessageTimer = config.chatMessageTimer
}

export default onReceiveChatMessage