import { gameCanvas, gameContext } from "../const.js"

class Renderer {
    constructor() {
        this.fps = 0
        this.delta = 0

        this.layers = new Map([
            [ 1, new Map() ], // Systems, backgrounds, grids...
            [ 2, new Map() ], // Entities
            [ 3, new Map() ]  // ESP and others...
        ])

        this.nowUpdate = 0
        this.lastUpdate = Date.now()

        this.update()
    }

    add(layer, { id, _function }) {
        return this.layers.get(layer).set(id, {
            layer: layer,
            id: id,
            _function: _function,
        })
    }

    remove(layer, id) {
        this.layers.get(layer).delete(id)
    }

    update() {
        this.nowUpdate = Date.now()
        this.fps += (1000 / Math.max(Date.now() - this.lastUpdate, 1) - this.fps) / 10
        this.delta = this.nowUpdate - this.lastUpdate
        this.lastUpdate = this.nowUpdate

        gameContext.ctx.clearRect(0, 0, gameCanvas.scaledWidth, gameCanvas.scaledHeight)

        this.layers.forEach((layer) => {
            const layerArray = [ ...layer.values() ]

            for (let i = 0; i < layerArray.length; i++) {
                layer.get(i + 1)._function(this.delta)
            }
        })

        gameContext.ctx.save()
        gameContext.ctx.fillStyle = "rgba(0, 0, 70, 0.35)"

        gameContext.ctx.fillRect(0, 0, gameCanvas.scaledWidth, gameCanvas.scaledHeight)
        gameContext.ctx.restore()

        requestAnimationFrame(this.update.bind(this))
    }
}

export default Renderer