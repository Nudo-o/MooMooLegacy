import { clickWarp, im, players, ui } from "../../../../const.js"
import onChangeResource from "../hud/onChangeResource.js"
import config from "../../../../../../config.json"
import utils from "../../../../../../utils/index.js"

function onAddPlayer(data, isIm, isRecreate) {
    const [ 
        eid, nickname, x, y,
        dir, scale, skinIndex, isAdmin, 
        health, maxHealth, isGodmode, isDeveloper
    ] = data
    
    if (isIm) {
        im.nickname = nickname
        im.dir = dir
        im.scale = scale
        im.skinIndex = skinIndex
        im.health = health
        im.maxHealth = maxHealth
        im.isDeveloper = isDeveloper
        im.isAdmin = isAdmin
        im.isGodmode = isGodmode

        if (isRecreate) return

        im.setPosition(x, y)

        im.resources = utils.removeProto(config.startResources)
        im.inventory = utils.removeProto(config.startInventory)
        im.age = 1
        im.xp = 0
        im.maxXp = 300
        im.isPlaying = true
        im.isKilled = false
        im.isCreated = true
        im.isAttackAnimation = false
        im.attackAnimationTimer = 0
        im.attackAnimationRatio = 0
        im.attackAnimationIndex = 0
        im.attackAnimationTargetAngle = 0
        clickWarp.active = false

        im.recreateModels()
        ui.gui.updateAgeBar(0, im.age)
        ui.gui.updateInventoryBar(im.inventory)
        ui.gui.upgradesBarWeapons.setHtml("")
        ui.gui.upgradesBarItems.setHtml("")
        for (const type of [ "food", "wood", "stone", "gold" ]) onChangeResource(type, 100)
    } else {
        players.add(...data)
    }
}

export default onAddPlayer