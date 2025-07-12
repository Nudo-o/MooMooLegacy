import utils from "../../../utils/index.js"
import { renderer } from "../const.js"
import Manager from "./Manager.js"
import config from "../../../config.json"

class Entities extends Manager {
    constructor() {
        super()
    }

    interpolateEntities(filter, afterInterpolate) {
        const lastTime = renderer.nowUpdate - (1000 / config.tickRateDiv)

        this.forEach((player) => {
            if (!filter(player)) return

            player.updateRate += renderer.delta

            const total = player.updateTime - player.oldUpdateTime
            const fraction = lastTime - player.oldUpdateTime
            const ratio = fraction / total
            const rate = 170
            const tmpRate = Math.min(1.7, player.updateRate / rate)
            const different = player.tickPosition.different(player.oldTickPosition)

            player.setTo(
                player.oldTickPosition.x + (different.x * tmpRate), 
                player.oldTickPosition.y + (different.y * tmpRate)
            )

            player.dir = utils.lerpAngle(player.tickDir, player.oldTickDir, Math.min(1.2, ratio))

            typeof afterInterpolate === 'function' && afterInterpolate(player)
        })
    }
}

export default Entities