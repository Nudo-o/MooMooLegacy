import { gameObjects } from "../const.js"

export default {
    command: "/delete_resource",
    argsLength: 1,
    checkArgs(message) {
        const args = message.split(" ").slice(1)

        if (args.length < this.argsLength) return false

        return {
            gameObjectEid: parseInt(args[0])
        }
    },
    execute(message) {
        const args = this.checkArgs(message)

        if (!args) return
        if (!gameObjects.has(args.gameObjectEid)) return

        const gameObject = gameObjects.get(args.gameObjectEid)

        if (gameObject.isItem) return

        gameObjects.removeGameObject(args.gameObjectEid)
    }
}