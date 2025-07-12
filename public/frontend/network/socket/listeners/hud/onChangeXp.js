import { im, ui } from "../../../../const.js"

function onChangeXp(xp, maxXp, age) {
    if (typeof maxXp !== 'undefined' && typeof age !== 'undefined') {
        im.maxXp = maxXp
        im.age = age
        im.xp = 0

        return ui.gui.updateAgeBar(0, im.age)
    }

    im.xp = xp

    ui.gui.updateAgeBar((im.xp / im.maxXp) * 100, im.age)
}

export default onChangeXp