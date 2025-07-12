import { ui } from "../const.js"
import config from "../../../config.json"

class Canvas {
    constructor() {
        this.view = ui.get$("#game_canvas")
        this.context = this.view.getContext("2d")

        this.scale = 1

        this.resize()

        window.addEventListener("resize", this.resize.bind(this))
    }

    get scaledWidth() {
        return this.view.width / this.scale
    }

    get scaledHeight() {
        return this.view.height / this.scale
    }

    resize() {
        const { innerWidth, innerHeight } = window
        const { viewport } = config
        const scale = Math.max(innerWidth / viewport.width, innerHeight / viewport.height)

        this.scale = scale
        this.view.width = innerWidth
        this.view.height = innerHeight
        this.view.style.width = `${innerWidth}px`
        this.view.style.height = `${innerHeight}px`

        this.context.scale(this.scale, this.scale)
    }
}

export default Canvas