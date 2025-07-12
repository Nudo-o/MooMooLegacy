import config from "../../../../config.json"
import layers from "../layers.json"
import { gameContext, im, renderer, ui } from "../../const.js"

class Minimap {
    constructor() {
        this.id = layers.minimap.id
        this.layer = layers.minimap.layer

        this.canvas = document.getElementById("minimap_canvas")
        this.context = this.canvas.getContext("2d")

        renderer.add(this.layer, {
            id: this.id,
            _function: this.render.bind(this)
        })
    }

    get width() {
        return this.canvas.width
    }

    get height() {
        return this.canvas.height
    }

    render() {
        if (!im.isPlaying) return

        this.context.clearRect(0, 0, this.width, this.height)

        this.context.save()
        this.context.fillStyle = "#ffffff"

        gameContext.drawCircle(
            this.context,
            (im.x / config.map.width) * this.width, 
            (im.y / config.map.height) * this.height, 
            7, true
        )
        this.context.restore()
    }
}

export default Minimap