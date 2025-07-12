import { animals } from "../../../../const.js"

function onRemoveAnimal(eid) {
    animals.delete(eid)
}

export default onRemoveAnimal