import { MessageBuilder, Webhook } from "discord-webhook-node"
import Emitter from "../utils/Emitter.js"
import { network } from "./const.js"
import config from "../config.json" with { type: "json" }
import commandsList from "./chat_commands/commandsList.js"

const SYSTEMER_URL = "WEBHOOK_URL"
const GAMER_URL = "WEBHOOK_URL"

class LegacyLogger extends Emitter {
    constructor() {
        super()

        this.isActive = false

        this.on("completing-setup", this.sendServerSetup.bind(this))
        this.on("kill-player", this.sendKillPlayer.bind(this))
    }

    sendKillPlayer(killedNickname, killerNickname, gameObjectKiller) {
        if (!this.isActive) return

        const webhook = new Webhook(GAMER_URL)
        const embed = new MessageBuilder()
        .setColor("#992aa7")
        .setDescription(`
        **${killedNickname}** was killed by a ${gameObjectKiller ? `**${gameObjectKiller.toLowerCase()}** game object.\n**${gameObjectKiller}** owner is **${killerNickname}**.` : `**${killerNickname}** player.`}
        `.trim())
        .setTimestamp()

        webhook.send(embed)
    }

    sendServerSetup(trees, bushes, rocks, golds) {
        if (!this.isActive) return

        const webhook = new Webhook(SYSTEMER_URL)
        const embed = new MessageBuilder()
        .setColor("#992aa7")
        .setDescription(`
        **Game version**: ${config.gameVersion}
        **Server status**: Online
        **Server slots**: ${config.maxServerSlots}
        **Provider IP limit**: ${config.ipLimit}
        **Game map size**: ${config.map.width}x${config.map.height}
        **Generated resources**: :deciduous_tree: ${trees} :apple: ${bushes} :rock: ${rocks} :coin: ${golds}
        **Commands amount**: ${commandsList.length}
        **Packets amount**: ${Object.keys(config.packets).length}
        `.trim())
        .setTimestamp()

        webhook.send(embed)
    }
}

export default LegacyLogger