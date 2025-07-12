import { network } from "../const.js"

export default {
    command: "/kill",
    argsLength: 1,
    checkArgs(message) {
        const args = message.split(" ").slice(1)

        if (args.length < this.argsLength) return false

        return {
            eid: parseInt(args[0])
        }
    },
    execute(message, author) {
        const args = this.checkArgs(message)

        if (!args || !author.player.isDeveloper) return
        
        const socket = network.server.slots.get(args.eid)

        if (typeof socket !== 'object') return
        if (!socket.player.isPlaying) return

        socket.player.kill(author.player)
    }
}