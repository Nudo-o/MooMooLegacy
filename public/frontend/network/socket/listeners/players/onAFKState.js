import { players } from "../../../../const.js"

function onAFKState(eid, _isAFK) {
    const player = players.get(eid)

    if (!player) return

    player.isAFK = _isAFK
}

export default onAFKState