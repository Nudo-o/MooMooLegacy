import { animals } from "../../../../const.js"

function onAddAnimal(data) {
    animals.addAnimal(...data)
}

export default onAddAnimal