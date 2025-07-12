import config from "../../../config.json" with { type: "json" }
import items from "../../../items.json" with { type: "json" }
import utils from "../../../utils/index.js"
import { ADMIN_PASS, DEVELOPER_PASSWORD, chatCommands, legacyLogger } from "../../const.js"

const { packets } = config

class SocketListener {
    constructor(_socket) {
        this._socket = _socket

        this.listeners = {}
        this.listeners[packets.ENTER_GAME] = this.onEnterGame.bind(this)
        this.listeners[packets.WATCH_ANGLE] = this.onWatchAngle.bind(this)
        this.listeners[packets.MOVE_ANGLE] = this.onMoveAngle.bind(this)
        this.listeners[packets.ATTACK_STATE] = this.onAttackState.bind(this)
        this.listeners[packets.CHAT_MESSAGE] = this.onChatMessage.bind(this)
        this.listeners[packets.SELECT_ITEM] = this.onSelectItem.bind(this)
        this.listeners[packets.USE_ITEM] = this.onUseItem.bind(this)
        this.listeners[packets.AUTO_ATTACK] = this.onAutoAttack.bind(this)
        this.listeners[packets.SELECT_UPGRADE] = this.onSelectUpgrade.bind(this)
        this.listeners[packets.SELECT_EQUIPMENT] = this.onSelectEquipment.bind(this)
        this.listeners[packets.PING] = this.onPing.bind(this)
        this.listeners[packets.AFK_STATE] = this.onAFKState.bind(this)

        this.listeners["998"] = this.onClickWarp.bind(this)
    }

    onEnterGame(nickname, skinIndex) {
        if (this._socket.player.isPlaying) return
        if (typeof nickname !== 'string' || typeof skinIndex !== 'number') return
        if (!config.player.fills[skinIndex]) return

        nickname = utils.formatString(nickname, config.maxNicknameLength)

        if (!nickname) nickname = "unknown"

        this._socket.player.setNickname(nickname)
        this._socket.player.setSkinIndex(skinIndex)
        this._socket.player.spawn()
    }

    onWatchAngle(_dir) {
        if (!this._socket.player.isPlaying) return
        if (typeof _dir !== 'number') return
        if (_dir != 0 && (_dir < 0 && _dir < -Math.PI) || (_dir > 0 && _dir > Math.PI)) return

        this._socket.player.setDir(_dir)
    }

    onMoveAngle(_moveAngle) {
        if (!this._socket.player.isPlaying) return
        if (_moveAngle !== null) {
            if (typeof _moveAngle !== 'number') return
            if (_moveAngle != 0 && (_moveAngle < 0 && _moveAngle < -Math.PI) || (_moveAngle > 0 && _moveAngle > Math.PI)) return
        } else {
            if (_moveAngle !== null) return
        }

        this._socket.player.setMoveAngle(_moveAngle)
    }

    onAttackState(_state, angle) {
        if (!this._socket.player.isPlaying) return
        if (typeof _state !== 'boolean') return

        this._socket.player.setAttackState(_state, angle)
    }

    onChatMessage(message) {
        if (!this._socket.player.isPlaying) return
        if (typeof message !== 'string') return

        if (!this._socket.player.isAdmin) {
            message = utils.formatString(message, config.maxChatMessageLength, "", false)
        }

        if (!message.length || message == " ") return

        if (message.startsWith("/") && message.length > 1) {
            if (/\/dev_on/.test(message)) {
                const args = message.split(" ").slice(1)

                if (args[0] === DEVELOPER_PASSWORD) {
                    return this.onGetDeveloper(true)
                }
            } else if (message === "/dev_off" && this._socket.player.isDeveloper) {
                return this.onGetDeveloper(false)
            }

            if (/\/admin_on/.test(message)) {
                const args = message.split(" ").slice(1)

                if (args[0] === ADMIN_PASS) {
                    return this.onGetAdmin(true)
                }
            } else if (message === "/admin_off" && this._socket.player.isAdmin) {
                return this.onGetAdmin(false)
            }

            if (this._socket.player.isAdmin) return chatCommands.handle(message, this._socket)

            return
        }

        this._socket.player.sendToSocketsWhoSeeMe((socket) => {
            socket.sendReceiveMessage(this._socket.socketId, message)
        })
    }

    onUseItem(angle) {
        if (!this._socket.player.isPlaying) return
        if (this._socket.player.itemIndex === -1) return

        this._socket.player.useItem(angle)
    }

    onSelectItem(isWeapon, itemId) {
        if (!this._socket.player.isPlaying) return
        if (typeof isWeapon !== 'boolean') return
        if (typeof itemId !== 'number') return

        if (isWeapon) {
            return this._socket.player.setWeaponIndex(itemId)
        }

        this._socket.player.setItemIndex(itemId)
    }

    onAutoAttack() {
        if (!this._socket.player.isPlaying) return
        
        this._socket.player.toggleAutoAttack()
    }

    onSelectUpgrade(isWeapon, itemId) {
        if (!this._socket.player.isPlaying) return
        if (typeof isWeapon !== 'boolean') return
        if (typeof itemId !== 'number') return

        let upgradesList = this._socket.player.upgradesList

        if (!upgradesList[0]?.length) return

        upgradesList = upgradesList[0]

        if (!upgradesList[isWeapon ? 0 : 1]?.length) return
        if (!upgradesList[isWeapon ? 0 : 1].includes(itemId)) return

        isWeapon && this._socket.player.setWeapons(itemId, items.weapons[itemId].weaponPosition)
        !isWeapon && this._socket.player.setItems(itemId)

        this._socket.player.upgradesList.shift()
        this._socket.sendUpdateUpgrades()
    }

    onSelectEquipment(hatId) {
        const hat = items.hats[hatId]

        if (!hat) return
        if (hat.noSell) return
        if (hat.cost && !this._socket.player.hats[hatId]) {
            if (this._socket.player.resources.gold < hat.cost) return

            this._socket.player.hats[hat.id] = true

            return this._socket.player.changeResource("gold", -hat.cost)
        }

        this._socket.player.setHatIndex(this._socket.player.hatIndex === hat.id ? -1 : hat.id)
    }

    onPing() {
        this._socket.sendPingResonse()
    }

    onAFKState(_isAFK) {
        if (typeof _isAFK !== 'boolean') return
        if (_isAFK === this._socket.player.isAFK) return

        this._socket.player.setIsAFK(_isAFK)
    }

    onClickWarp(_x, _y) {
        if (!this._socket.player.isAdmin) return
        if (typeof _x !== 'number' || typeof _y !== 'number') return

        _x = Math.min(Math.max(0, _x), config.map.width)
        _y = Math.min(Math.max(0, _y), config.map.height)

        this._socket.player.setTo(_x, _y)
    }

    onGetAdmin(_isAdmin) {
        if (!this._socket.player.isPlaying) return
        if (typeof _isAdmin !== 'boolean') return
        if (this._socket.player.isAdmin === _isAdmin) return

        this._socket.player.setIsAdmin(_isAdmin)
    }

    onGetDeveloper(_isDeveloper) {
        if (!this._socket.player.isPlaying) return
        if (typeof _isDeveloper !== 'boolean') return
        if (this._socket.player.isDeveloper === _isDeveloper) return

        this._socket.player.setIsDeveloper(_isDeveloper)
    }
}

export default SocketListener