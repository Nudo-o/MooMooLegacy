import { gameObjects } from "../../../../const.js"

function onAddGameObject(data) {
    if (data[0]) return gameObjects.addItemObject(...data.slice(1))

    gameObjects.addResourceObject(...data.slice(1))
}

export default onAddGameObject