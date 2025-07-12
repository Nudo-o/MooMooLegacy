import { im, ui } from "../../../../const.js"

function onUpdateInventory(inventory) {
    im.inventory = inventory

    ui.gui.updateInventoryBar(im.inventory)
}

export default onUpdateInventory