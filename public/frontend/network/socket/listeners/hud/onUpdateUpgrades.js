import { ui } from "../../../../const.js"

function onUpdateUpgrades(upgrades, upgradesCount) {
    ui.gui.updateUpgradesBar(upgrades, upgradesCount)
}

export default onUpdateUpgrades