export default {
    command: "/godmode",
    argsLength: 1,
    checkArgs(message) {
        const args = message.split(" ").slice(1)

        if (args.length < this.argsLength) return false

        const godModeState = parseInt(args[0])

        return {
            godModeState: ![ 0, 1 ].includes(godModeState) ? null : Boolean(godModeState)
        }
    },
    execute(message, author) {
        const args = this.checkArgs(message)

        if (!args) return
        if (args.godModeState === null || author.player.isGodmode === args.godModeState) return

        author.player.setIsGodmode(args.godModeState)
    }
}