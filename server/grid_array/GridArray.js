import config from "../../config.json" with { type: "json" }
import utils from "../../utils/index.js"

class Cell extends utils.Point {
    constructor(id, x, y, size) {
        super(x, y, 0, 0)

        this.id = id
        this.size = size

        this.middleX = this.x + this.size / 2
        this.middleY = this.y + this.size / 2
        this.isFree = this.biome !== "bridge"
    }

    get biome() {
        if (config.bridge.gridCells.includes(this.id)) {
            return "bridge"
        }

        if (this.middleY >= config.map.height / 2 - config.biomes.river.height / 2) {
            if (this.middleY <= config.map.height / 2 + config.biomes.river.height / 2) {
                return "river"
            }
        }

        return "grass"
    }

    getRandomInnerPosition() {
        return {
            x: utils.randInt(this.x, this.x + this.size),
            y: utils.randInt(this.y, this.y + this.size)
        }
    }

    occupy(state) {
        this.isFree = state
    }
}

class GridArray {
    constructor() {
        this.cells = new Map()

        this.cellSize = 200

        this.generate()
    }

    get list() {
        return [ ...this.cells.values() ]
    }

    get gridSizeX() {
        return config.map.width / this.cellSize
    }

    get gridSizeY() {
        return config.map.height / this.cellSize
    }

    getFreeCells(biome) {
        return this.list.filter((cell) => cell.isFree && new RegExp(biome).test(cell.biome))
    }

    getRandomFreeCell(biome) {
        const freeCells = this.getFreeCells(biome)

        return freeCells[utils.randInt(0, freeCells.length - 1)]
    }

    occupyCell(cellId, state) {
        const cell = this.cells.get(cellId)

        cell.occupy(state)
    }

    generate() {
        this.cells.clear()

        for (let x = 0; x < this.gridSizeX; x += 1) {
            for (let y = 0; y < this.gridSizeY; y += 1) {
                const id = `${x}_${y}`
                const _x = this.cellSize * x
                const _y = this.cellSize * y

                this.cells.set(id, new Cell(id, _x, _y, this.cellSize))
            }
        }
    }
}

export default GridArray