import layers from "../layers.json"
import { renderer, ui } from "../../const.js"

class DeathText {
    constructor() {
        this.id = layers.deathText.id
        this.layer = layers.deathText.layer

        this.scale = this.maxScale = 120

        renderer.add(this.layer, {
            id: this.id,
            _function: this.update.bind(this)
        })
    }

    get speed() {
        return 0.1 * renderer.delta
    }

    get fontSize() {
        return Math.min(Math.round(this.scale), this.maxScale)
    }

    setScale(_scale) {
        this.scale = _scale
    }

    update() {
        if (this.scale >= this.maxScale) return (this.scale = this.maxScale)

        this.scale += this.speed

        ui.gui.deathText.setFontSize(`${this.fontSize}px`)
    }
}

export default DeathText