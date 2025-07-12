import { animals, gameObjects, network } from "../../const.js"
import config from "../../../config.json" with { type: "json" }

class SocketUpdater {
    constructor(_socket) {
        this._socket = _socket

        this.socketsInViewport = {}
        this.gameObjectsInViewport = {}
        this.animalsInViewport = {}
    }

    updateSocketsInViewport() {
        const sockets = network.server.slots.getNotFreeSlots()

        if (!sockets.length) return

        for (let i = 0; i < sockets.length; i++) {
            const socket = sockets[i]

            const isIm = socket.socketId === this._socket.socketId
            const data = socket.player.getInitData()
            
            if (isIm && socket.player.isPlaying && !this.socketsInViewport[socket.socketId]) {
                this.socketsInViewport[socket.socketId] = 1
                this._socket.sendAddPlayer(data, isIm, isIm ? this._socket.player.isRecreate : false)

                continue
            }

            if (!socket.player.isPlaying || !this._socket.player.isCanSee(socket.player)) continue
            if (this.socketsInViewport[socket.socketId]) continue

            if (!this.socketsInViewport[socket.socketId]) {
                this._socket.sendAddPlayer(data, isIm, isIm ? this._socket.player.isRecreate : false)
            }

            this.socketsInViewport[socket.socketId] = 1
        }

        this._socket.player.isRecreate = false

        this._socket.player.update(network.delta)

        const socketsIDs = new Map([
            ...Object.entries(this.socketsInViewport)
        ])
        const updateDataArray = []
        
        socketsIDs.forEach((_, socketId) => {
            const socketIdStr = socketId

            socketId = +socketId
            
            const socket = network.server.slots.get(socketId)

            if ((!socket || typeof socket !== 'object') && this.socketsInViewport[socketIdStr]) {
                delete this.socketsInViewport[socketIdStr]

                return this._socket.sendRemovePlayer(socket.socketId)
            }

            if (this._socket.player.isCanSee(socket.player)) {
                return updateDataArray.push(...socket.player.getUpdateData())
            }

            this._socket.sendRemovePlayer(socket.socketId)

            delete this.socketsInViewport[socket.socketId.toString()]
        })

        if (!updateDataArray.length) return

        this._socket.sendUpdatePlayers(updateDataArray)
    }

    updateGameObjectInViewport() {
        for (let i = 0; i < gameObjects.list.length; i++) {
            const gameObject = gameObjects.list[i]

            if (!this._socket.player.isCanSee(gameObject)) continue
            if (this.gameObjectsInViewport[gameObject.eid]) continue

            const data = gameObject.getInitData()

            if (!this.gameObjectsInViewport[gameObject.eid] && gameObject.isVisibleToPlayer(this._socket.player)) {
                this._socket.sendAddGameObject(data)
            }

            this.gameObjectsInViewport[gameObject.eid] = 1
        }

        const gameObjectsIDs = new Map([
            ...Object.entries(this.gameObjectsInViewport)
        ])
        
        gameObjectsIDs.forEach((_, gameObjectId) => {
            const gameObjectIdStr = gameObjectId

            gameObjectId = +gameObjectId
            
            const gameObject = gameObjects.get(gameObjectId)

            if ((!gameObject || typeof gameObject !== 'object') && this.gameObjectsInViewport[gameObjectIdStr]) {
                if (typeof gameObject === 'object') {
                    if (!gameObject.isVisibleToPlayer(this._socket.player)) return
                }
                
                delete this.gameObjectsInViewport[gameObjectIdStr]

                return this._socket.sendRemoveGameObject(gameObjectId)
            }

            if (this._socket.player.isCanSee(gameObject)) return

            if (gameObject.isVisibleToPlayer(this._socket.player)) {
                this._socket.sendRemoveGameObject(gameObject.eid)
            }

            delete this.gameObjectsInViewport[gameObject.eid.toString()]
        })
    }

    updateAnimalsInViewport() {
        if (!animals.size) return

        for (let i = 0; i < animals.list.length; i++) {
            const animal = animals.list[i]

            if (!this._socket.player.isCanSee(animal)) continue
            if (this.animalsInViewport[animal.eid]) continue

            const data = animal.getInitData()
            
            if (!this.animalsInViewport[animal.eid]) {
                this._socket.sendAddAnimal(data)
            }

            this.animalsInViewport[animal.eid] = 1
        }

        const animalsIDs = new Map([
            ...Object.entries(this.animalsInViewport)
        ])
        const updateDataArray = []
        
        animalsIDs.forEach((_, animalId) => {
            const animalIdStr = animalId

            animalId = +animalId
            
            const animal = animals.get(animalId)

            if ((!animal || typeof animal !== 'object') && this.animalsInViewport[animalIdStr]) {
                delete this.animalsInViewport[animalIdStr]

                return this._socket.sendRemoveAnimal(animalId)
            }

            if (this._socket.player.isCanSee(animal)) {
                return updateDataArray.push(...animal.getUpdateData())
            }

            this._socket.sendRemoveAnimal(animal.eid)

            delete this.animalsInViewport[animal.eid.toString()]
        })

        if (!updateDataArray.length) return

        this._socket.sendUpdateAnimals(updateDataArray)
    }

    update() {
        this.updateGameObjectInViewport()
        this.updateAnimalsInViewport()
        this.updateSocketsInViewport()
    }
}

export default SocketUpdater