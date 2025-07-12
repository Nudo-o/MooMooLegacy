import { renderer } from "../const.js"
import Entities from "./Entities.js"
import layers from "../renders/layers.json"
import Player from "../entities/Player.js"

class Players extends Entities {
    constructor() {
        super()

        this.chatMessagesId = layers.chatMessages.id
        this.chatMessagesLayer = layers.chatMessages.layer

        renderer.add(this.chatMessagesLayer, {
            id: this.chatMessagesId,
            _function: this.renderChatMessages.bind(this)
        })

        renderer.add(layers.playersESPLow.layer, {
            id: layers.playersESPLow.id,
            _function: this.renderPlayersESP.bind(this, 0)
        })

        renderer.add(layers.playersESPHigh.layer, {
            id: layers.playersESPHigh.id,
            _function: this.renderPlayersESP.bind(this, 1)
        })

        renderer.add(layers.playersLow.layer, {
            id: layers.playersLow.id,
            _function: this.update.bind(this, 0)
        })

        renderer.add(layers.playersHigh.layer, {
            id: layers.playersHigh.id,
            _function: this.update.bind(this, 1)
        })
    }

    add(...data) {
        const player = new Player(...data)

        this.set(data[0], player)

        return player
    }

    remove(eid) {
        if (!this.has(eid)) return

        this.delete(eid)
    }

    renderPlayersESP(renderLayer) {
        this.each((_player) => {
            if (!_player.esp) return
            if (renderLayer !== ([ 0, 2 ].includes(_player.renderLayer) ? 1 : 0)) return

            _player.esp.renderPlayerESP()
        })
    }

    renderChatMessages() {
        this.each((_player) => {
            if (!_player.esp) return

            _player.esp.drawChatMessage()
        })
    }

    update(renderLayer) {
        this.interpolateEntities((_player) => ([ 0, 2 ].includes(_player.renderLayer) ? 1 : 0) === renderLayer, (_player) => _player.update())
    }
}

export default Players