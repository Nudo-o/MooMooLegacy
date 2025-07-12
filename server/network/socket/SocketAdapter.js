import config from "../../../config.json" with { type: "json" }
import utils from "../../../utils/index.js"
import { animals, network } from "../../const.js"

const { packets } = config

class SocketAdapter {
    constructor() {
        this._socket = null
    }

    setSocket(_socket) {
        this._socket = _socket
    }

    sendSetup() {
        this._socket.send(packets.SETUP, this._socket.socketId)
    }

    sendAddPlayer(data, isIm, isRecreate) {
        this._socket.send(packets.ADD_PLAYER, data, isIm, isRecreate)
    }

    sendRemovePlayer(eid) {
        if (eid === this._socket.player.eid) return

        this._socket.send(packets.REMOVE_PLAYER, eid)
    }

    sendUpdatePlayers(data) {
        const offset = this._socket.player.getUpdateData().length

        data.unshift(offset)
        
        this._socket.send(packets.UPDATE_PLAYERS, data)
    }

    sendAttackAnimation(eid, isDidHit) {
        this._socket.send(packets.ATTACK_ANIMATION, eid, isDidHit)
    }

    sendChangeHealth(eid, _health, isShowFadeText, isAnimal) {
        this._socket.send(packets.CHANGE_HEALTH, eid, _health, isShowFadeText, isAnimal)
    }

    sendKillPlayer() {
        this._socket.send(packets.KILL_PLAYER)
    }

    sendUpdateLeaderboard() {
        const sockets = network.server.slots.getNotFreeSlots()
        const playingSockets = sockets.filter((socket) => socket.player?.isPlaying)
        const sorted = playingSockets.sort((a, b) => b.player.resources.gold - a.player.resources.gold).slice(0, 10)

        let data = sorted.map((socket) => [ socket.socketId,socket.player.nickname, parseInt(socket.player.resources.gold) ])

        this._socket.send(packets.UPDATE_LEADERBOARD, data.flat(1))
    }

    sendChangeResource(type, value) {
        this._socket.send(packets.CHANGE_RESOURCE, type, value)
    }

    sendAddGameObject(data) {
        this._socket.send(packets.ADD_GAMEOBJECT, data)
    }

    sendRemoveGameObject(eid) {
        this._socket.send(packets.REMOVE_GAMEOBJECT, eid)
    }

    sendGameObjectWiggle(eid, angle) {
        this._socket.send(packets.GAMEOBJECT_WIGGLE, eid, angle)
    }

    sendChangeXp(xp, maxXp, age) {
        const data = [ xp, maxXp, age ].filter((value) => typeof value !== 'undefined')

        this._socket.send(packets.CHANGE_XP, ...data)
    }

    sendReceiveMessage(eid, message) {
        this._socket.send(packets.RECEIVE_CHAT_MESSAGE, eid, message)
    }

    sendUpdateInventory() {
        this._socket.send(packets.UPDATE_INVENTORY, this._socket.player.inventory)
    }

    sendUpdateItemsCount() {
        this._socket.send(packets.UPDATE_ITEMS_COUNT, this._socket.player.itemsCount)
    }
    
    sendUpdateUpgrades() {
        let upgradesList = utils.removeProto(this._socket.player.upgradesList)

        if (!upgradesList[0]?.length) return

        upgradesList = upgradesList[0]

        if (!upgradesList[0]?.length && !upgradesList[1]?.length) return

        const upgrades = {}

        upgradesList[0].length && (upgrades.weapons = upgradesList[0])
        upgradesList[1].length && (upgrades.items = upgradesList[1])

        this._socket.send(packets.UPDATE_UPGRADES, upgrades, this._socket.player.upgradesList.length)
    }

    sendPingResonse() {
        this._socket.send(packets.PING_RESPONSE)
    }

    sendAFKState(eid, _isAFK) {
        this._socket.send(packets.AFK_STATE, eid, _isAFK)
    }

    sendAddAnimal(data) {
        this._socket.send(packets.ADD_ANIMAL, data)
    }

    sendRemoveAnimal(eid) {
        this._socket.send(packets.REMOVE_ANIMAL, eid)
    }

    sendUpdateAnimals(data) {
        const offset = animals.list[0].getUpdateData().length

        data.unshift(offset)
        
        this._socket.send(packets.UPDATE_ANIMALS, data)
    }

    sendToAllWhoSeeMe(callback) {
        const socketsInViewport = Object.keys(this._socket.updater.socketsInViewport)

        for (const socketId of socketsInViewport) {
            const socket = network.server.slots.get(+socketId)

            if (typeof socket !== 'object') continue

            callback(socket)
        }

        const sockets = network.server.slots.getNotFreeSlots()
        const killedSockets = sockets.filter((socket) => socket.player.isKilled)

        for (const killedSocket of killedSockets) {
            if (!killedSocket.player.isCanSee(this._socket.player)) return

            callback(killedSocket)
        }
    }
}

export default SocketAdapter