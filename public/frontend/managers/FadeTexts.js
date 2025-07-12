import utils from "../../../utils/index.js"
import Manager from "./Manager.js"
import layers from "../renders/layers.json"
import FadeText from "../effects/FadeText.js"
import { renderer } from "../const.js"

class FadeTexts extends Manager {
    constructor() {
        super()

        this.id = layers.fadeTexts.id
        this.layer = layers.fadeTexts.layer

        renderer.add(this.layer, {
            id: this.id,
            _function: this.update.bind(this)
        })
    }

    generateId() {
        const eid = utils.randInt(0, 999)

        if (this.has(eid)) return this.generateId()

        return eid
    }

    addFadeText(text, x, y, size, speed, lifeTime, color) {
        const id = this.generateId()

        this.set(id, new FadeText(id, text, x, y, size, speed, lifeTime, color))
    }

    removeFadeText(id) {
        if (!this.has(id)) return

        this.delete(id)
    }

    update() {
        this.forEach((fadeText) => fadeText.render())
    }
}

export default FadeTexts