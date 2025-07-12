import { im, ui } from "../../../../const.js"

function onChangeResource(type, value) {
    im.setResource(type, value)
    ui.gui[`${type}Text`].setHtml(value)
}

export default onChangeResource