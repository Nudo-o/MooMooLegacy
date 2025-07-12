import { animals } from "../../../../const.js"

function onUpdateAnimals(data) {
    const offset = data[0]
    const currentTime = Date.now()

    data = data.slice(1, data.length)

    for (let i = 0; i < data.length; i += offset) {
        const chunk = data.slice(i, i + offset)
        const [ eid, x, y, dir, renderLayer ] = chunk
        const animal = animals.get(eid)

        if (!animal) continue

        // UPDATE TIME:
        animal.updateRate = 0
        animal.oldUpdateTime = (animal.updateTime === null) ? currentTime : animal.updateTime
        animal.updateTime = currentTime

        // POSITION:
        animal.oldTickPosition.set(animal.x, animal.y)
        animal.tickPosition.set(x, y)

        // DIR:
        animal.oldTickDir = animal.tickDir
        animal.tickDir = dir

        // LAYER:
        animal.renderLayer = renderLayer
    }
}

export default onUpdateAnimals