import utils from "../../../../utils/index.js";
import { im, network, ui } from "../../const.js";
import messageListeners from "./listeners/index.js"
import config from "../../../../config.json"
import items from "../../../../items.json"

const { packets } = config

class SocketAdapter extends utils.Emitter {
    constructor() {
        super()

        this._socket = null

        this.packetListeners = new Map()

        this.#initMessageListeners()
    }

    setSocket(_socket) {
        this._socket = _socket
    }

    sendEnterGame() {
        const nickname = utils.formatString(ui.gameNicknameInput.value, config.maxNicknameLength)
        const skinIndex = 0

        this._socket.send(packets.ENTER_GAME, nickname, skinIndex)
    }

    sendWatchAngle(_angle) {
        if (!im.isPlaying) return

        this._socket.send(packets.WATCH_ANGLE, _angle)
    }

    sendMoveAngle(_angle) {
        if (!im.isPlaying) return

        this._socket.send(packets.MOVE_ANGLE, _angle)
    }

    sendAttackState(_state) {
        if (!im.isPlaying) return
        if (typeof _state !== 'boolean') return

        this._socket.send(packets.ATTACK_STATE, _state)
    }

    sendChatMessage(message) {
        if (!im.isPlaying) return
        if (typeof message !== 'string') return

        if (!im.isAdmin) {
            message = utils.formatString(message, config.maxChatMessageLength, "", false)
        } else {
            if (message === "/toggle_agrid") {
                if (typeof im.adminGridState === 'undefined') {
                    im.adminGridState = false
                }

                return (im.adminGridState = !im.adminGridState)
            }
        }

        if (!message.length || message == " ") return

        this._socket.send(packets.CHAT_MESSAGE, message)
    }

    sendSelectItem(isWeapon, itemId) {
        if (!im.isPlaying) return
        if (typeof isWeapon !== 'boolean') return
        if (typeof itemId !== 'number') return
        if (!im.inventory[isWeapon ? "weapons" : "items"].includes(itemId) && itemId !== -1) return
        
        this._socket.send(packets.SELECT_ITEM, isWeapon, itemId)
    }

    sendUseItem() {
        if (!im.isPlaying) return

        this._socket.send(packets.USE_ITEM, im.renderDir)
    }

    sendAutoAttack() {
        if (!im.isPlaying) return

        this._socket.send(packets.AUTO_ATTACK)
    }

    sendSelectUpgrade(isWeapon, itemId) {
        if (!im.isPlaying) return
        if (typeof isWeapon !== 'boolean') return
        if (typeof itemId !== 'number') return

        this._socket.send(packets.SELECT_UPGRADE, isWeapon, itemId)        
    }

    sendSelectEquipment(hatId) {
        if (typeof hatId !== 'number') return
        if (!items.hats[hatId]) return

        const hat = items.hats[hatId]

        if (hat.cost && !im.hats[hat.id]) {
            if (im.resources.gold < hat.cost) return
        }

        this._socket.send(packets.SELECT_EQUIPMENT, hatId)

        im.hats[hat.id] = true
    }

    sendPing() {
        this._socket.send(packets.PING)

        network.lastPingSent = Date.now()
    }

    sendAFKState(_isAFK) {
        if (!im.isPlaying) return
        if (typeof _isAFK !== 'boolean') return

        this._socket.send(packets.AFK_STATE, _isAFK)
    }

    onPacket(packetId, listener) {
        if (!this.packetListeners.has(packetId)) {
            this.packetListeners.set(packetId, new Map())
        }

        const events = this.packetListeners.get(packetId)
        const id = listener.toString()

        events.set(id, listener)

        return {
            id, listener,
            delete() {
                return events.delete(id)
            }
        }
    }

    _callPacketListeners(packetId, content) {
        const events = this.packetListeners.get(packetId)

        if (!events?.size) return

        events.forEach((listener) => {
            listener(...content)
        })
    }

    #initMessageListeners() {
        for (const packetName in messageListeners) {
            this.onPacket(packetName, messageListeners[packetName])
        }
    }
}

export default SocketAdapter