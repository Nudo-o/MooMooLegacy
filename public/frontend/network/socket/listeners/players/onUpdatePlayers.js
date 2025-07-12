import { players } from "../../../../const.js"

function onUpdatePlayers(data) {
    const offset = data[0]
    const currentTime = Date.now()

    data = data.slice(1, data.length)

    for (let i = 0; i < data.length; i += offset) {
        const chunk = data.slice(i, i + offset)
        const [ eid, x, y, dir, weaponIndex, itemIndex, hatIndex, renderLayer ] = chunk
        const player = players.get(eid)

        if (!player) continue

        // UPDATE TIME:
        player.updateRate = 0
        player.oldUpdateTime = (player.updateTime === null) ? currentTime : player.updateTime
        player.updateTime = currentTime

        // POSITION:
        player.oldTickPosition.set(player.x, player.y)
        player.tickPosition.set(x, y)

        // DIR:
        player.oldTickDir = player.tickDir
        player.tickDir = dir

        // INDEXES:
        player.weaponIndex = weaponIndex
        player.itemIndex = itemIndex
        player.hatIndex = hatIndex

        // LAYERS:
        player.renderLayer = renderLayer
    }
}

export default onUpdatePlayers