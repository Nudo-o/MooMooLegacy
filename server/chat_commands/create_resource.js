import { gameObjects, gridArray } from "../const.js"

export default {
    command: "/create_resource",
    argsLength: 2,
    checkArgs(message) {
        const args = message.split(" ").slice(1)

        if (args.length < this.argsLength) return false
        
        const gridCellId = args[0].split("_")

        if (gridCellId.length !== 2) return
        if (!gridArray.cells.has(args[0])) return

        return {
            gridCellId: args[0],
            resourceType: args[1] === "tree" ? 0 : args[1] === "bush" ? 1 : args[1] === "rock" ? 2 : args[1] === "gold" ? 3 : void 0
        }
    },
    execute(message) {
        const args = this.checkArgs(message)

        if (!args) return

        const cell = gridArray.cells.get(args.gridCellId)

        if (!cell) return
        if (!cell.isFree) return
        if (args.resourceType === void 0) return

        const eid = gameObjects.generateEid()
        
        gridArray.occupyCell(cell.id, false)
        gameObjects.addResourceObject(cell.id, eid, cell.middleX, cell.middleY, args.resourceType, args.resourceType !== 3)
    }
}