import { animals, fadeTexts, players } from "../../../../const.js"
import config from "../../../../../../config.json"

function onChangeHealth(eid, _health, isShowFadeText, isAnimal) {
    if (isAnimal) {
        const animal = animals.get(eid)

        if (!animal) return
    
        const oldHealth = animal.health
    
        animal.setHealth(_health)
    
        const amount = animal.health - oldHealth
    
        return isShowFadeText && fadeTexts.addFadeText(Math.abs(amount), animal.x, animal.y, 50, 0.18, 500, amount < 0 ? "#ffffff" : "#8ecc51")
    }
    
    const player = players.get(eid)

    if (!player) return

    const oldHealth = player.health

    player.setHealth(_health)

    const amount = player.health - oldHealth

    if (amount < 0) {
        player.lastDamage = config.player.damageTime
    }

    isShowFadeText && fadeTexts.addFadeText(Math.abs(amount), player.x, player.y, 50, 0.18, 500, amount < 0 ? "#ffffff" : "#8ecc51")
}

export default onChangeHealth