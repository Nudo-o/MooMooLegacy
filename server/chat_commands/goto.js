import { gridArray, network } from "../const.js"

export default {
    command: "/goto",
    argsLength: 1,
    checkArgs(message) {
        let args = message.split(" ").slice(1)

        if (args.length < this.argsLength) return false

        args = args.join(" ")

        const isNickname = /[A-Za-z]/.test(args[0])

        return {
            playerId: isNickname ? void 0 : parseInt(args),
            playerNickname: isNickname ? args : void 0
        }
    },
    execute(message, author) {
        const args = this.checkArgs(message)

        if (!args) return

        if (typeof args.playerId !== 'undefined') {
            const socket = network.server.slots.get(args.playerId)

            if (typeof socket !== 'object') return
            if (socket.socketId === author.socketId) return

            const nearGridCell = gridArray.list.sort((a, b) => {
                a = socket.player.distanceTo(a)
                b = socket.player.distanceTo(b)
    
                return a - b
            })[0].getRandomInnerPosition()

            return author.player.setTo(nearGridCell.x, nearGridCell.y)
        }

        if (!args.playerNickname) return

        const sockets = network.server.slots.getNotFreeSlots()
        const socket = sockets.filter((socket) => socket?.player.nickname === args.playerNickname && socket.socketId !== author.socketId)[0]

        if (typeof socket !== 'object') return

        const nearGridCell = gridArray.list.sort((a, b) => {
            a = socket.player.distanceTo(a)
            b = socket.player.distanceTo(b)

            return a - b
        })[0].getRandomInnerPosition()

        author.player.setTo(nearGridCell.x, nearGridCell.y)
    }
}