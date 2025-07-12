import utils from "../../../utils/index.js"
import config from "../../../config.json"
import layers from "./layers.json"
import { gameCanvas, renderer, im } from "../const.js"

class Camera extends utils.Point {
    constructor() {
        super(0, 0, 0, 0)

        this.id = layers.camera.id
        this.layer = layers.camera.layer

        this.distance = 0
        this.angle = 0
        this.speed = 0

        this.xOffset = 0
        this.yOffset = 0

        renderer.add(this.layer, {
            id: this.id,
            _function: this.update.bind(this)
        })

    }

    follow(target) {
        this.distance = this.distanceTo(target)
        this.angle = this.angleTo(target)
        this.speed = Math.min(this.distance * .01 * renderer.delta, this.distance)

        if (this.distance > .05) {
            this.x += this.speed * Math.cos(this.angle)
            this.y += this.speed * Math.sin(this.angle)

            return
        }

        this.setTo(target.x, target.y)
    }

    update() {
        const mapMiddleX = config.map.width / 2
        const mapMiddleY = config.map.height / 2

        if (im.isPlaying || im.isKilled) {
            this.follow(im)
        } else {
            this.setTo(
                mapMiddleX,
                mapMiddleY
            )
        }

        this.xOffset = this.x - gameCanvas.scaledWidth / 2
        this.yOffset = this.y - gameCanvas.scaledHeight / 2
    }
}

export default Camera