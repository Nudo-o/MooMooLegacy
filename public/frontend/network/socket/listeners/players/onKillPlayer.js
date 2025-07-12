import { deathText, im, keys, ui } from "../../../../const.js"

function onKillPlayer() {    
    im.weapons = [ 0 ]
    im.weaponIndex = 0
    im.attackAnimationTimer = im.attackAnimationRatio = im.attackAnimationIndex = im.attackAnimationTargetAngle = 0
    im.isAttackAnimation = false
    im.isPlaying = false
    im.isKilled = true

    keys.clear()
    deathText.setScale(0)
    ui.gui.emit("show-kill-elements")
}

export default onKillPlayer