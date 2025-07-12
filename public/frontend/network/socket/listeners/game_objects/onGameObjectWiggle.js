import { gameObjects } from "../../../../const.js"

function onGameObjectWiggle(eid, angle) {
    gameObjects.get(eid).doWiggle(10, angle)
}

export default onGameObjectWiggle