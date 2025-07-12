import { players } from "../../../../const.js"

function onAttackAnimation(eid, isDidHit) {
    const player = players.get(eid)

    if (!player) return

    player.startAttackAnimation(isDidHit)
}

export default onAttackAnimation