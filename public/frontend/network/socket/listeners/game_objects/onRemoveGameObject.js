import { gameObjects } from "../../../../const.js"

function onRemoveGameObject(eid) {
    gameObjects.delete(eid)
}

export default onRemoveGameObject