import Emitter from "../../utils/Emitter.js"
import commandsList from "../chat_commands/commandsList.js"
import Manager from "./Manager.js"

class ChatCommands extends Manager {
    constructor() {
        super()

        this.commands = new Emitter()

        for (const command of commandsList) {
            this.commands.on(command.command, command.execute.bind(command))
        }
    }

    handle(message, author) {
        const commandKey = message.split(" ")[0]

        if (!this.commands.has(commandKey)) return

        this.commands.emit(commandKey, message, author)
    }
}

export default ChatCommands