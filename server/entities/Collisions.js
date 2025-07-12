import config from "../../config.json" with { type: "json" }
import utils from "../../utils/index.js"
import { animals, gameObjects, network } from "../const.js"

class Collisions {
    constructor(entity, { checkGameMap, checkPlayers, checkGameObjects, checkBridge, checkAnimals }) {
        this._entity = entity
        this.checkGameMap = checkGameMap
        this.checkPlayers = checkPlayers
        this.checkGameObjects = checkGameObjects
        this.checkBridge = checkBridge
        this.checkAnimals = checkAnimals
    }

    checkHitCollision(entity) {
        const distance = this._entity.distanceTo(entity) - entity.scale - this._entity.scale
        const angle = this._entity.angleTo(entity)

        if (distance > this._entity.weapon.range) return false
        if (utils.getAngleDistance(angle, this._entity.dir) > config.gatherAngle) return false

        return true
    }

    checkHitCollisions() {
        const socketsInViewport = Object.keys(this._entity._socket.updater.socketsInViewport)
        const gameObjectsInViewport = Object.keys(this._entity._socket.updater.gameObjectsInViewport)
        const animalsInViewport = Object.keys(this._entity._socket.updater.animalsInViewport)
        
        const allEntitiesIDs = [
            [ 0, socketsInViewport ], 
            [ 1, gameObjectsInViewport ],
            [ 2, animalsInViewport ]
        ]

        let hittedEntities = []

        for (const entitiesIDs of allEntitiesIDs) {
            for (const entityId of entitiesIDs[1]) {
                let entity = null

                if (entitiesIDs[0] === 0) {
                    if (+entityId === +this._entity._socket.socketId) continue

                    const socket = network.server.slots.get(+entityId)
                    
                    if (typeof socket !== 'object') continue

                    entity = socket.player
    
                    if (!entity?.isPlaying) continue
                } else if (entitiesIDs[0] === 1) {
                    entity = gameObjects.get(+entityId)

                    if (!entity.isVisibleToPlayer(this._entity)) entity = void 0
                } else if (entitiesIDs[0] === 2) {
                    entity = animals.get(+entityId)
                }

                if (!entity) continue
                if (!this.checkHitCollision(entity)) continue
    
                hittedEntities.push([ entitiesIDs[0], entity.eid ])
            }
        }

        return hittedEntities
    }

    checkBox(startX, startY, endX, endY, isInnerMode) {
        return {
            left: !isInnerMode ? this._entity.x <= startX : this._entity.x >= startX,
            right: !isInnerMode ? this._entity.x >= endX : this._entity.x <= endX,
            top: !isInnerMode ? this._entity.y <= startY : this._entity.y >= startY,
            bottom: !isInnerMode ? this._entity.y >= endY : this._entity.y <= endY
        }
    }

    collideGameMap(left, right, top, bottom) {
        if (left) {
            this._entity.x = this._entity.scale
        } else if (right) {
            this._entity.x = config.map.width - this._entity.scale
        }

        if (top) {
            this._entity.y = this._entity.scale
        } else if (bottom) {
            this._entity.y = config.map.height - this._entity.scale
        }
    }

    collideBridgeHandrails() {
        const handrailWidth = config.bridge.width / config.bridge.handrailSizeDiv
        const bridgeHeight = config.biomes.river.height + config.biomes.river.padding + config.bridge.paddingY
        const fastenerRadius = (config.bridge.width / (config.bridge.handrailSizeDiv + 3))
        const bridgeStartX = config.map.width / 2 - config.bridge.width / 2
        const bridgeStartY = config.map.height / 2 - bridgeHeight / 2
        const bridgeEndX = config.map.width / 2 + config.bridge.width / 2
        const bridgeEndY = config.map.height / 2 + bridgeHeight / 2
        const doorHeight = this._entity.scale + 5
        
        this._entity.isUnderOfBridge = false

        if (this._entity.x >= bridgeStartX - handrailWidth && this._entity.x <= bridgeEndX + handrailWidth) {
            if (this._entity.y >= bridgeStartY && this._entity.y <= bridgeEndY) {
                this._entity.isUnderOfBridge = true
            }
        }
        
        if (!this._entity.isOnlyRiverWalk) {
            if (this._entity.isEnterToBridgeState === 0) {
                if (this._entity.x - this._entity.scale >= bridgeStartX && this._entity.x + this._entity.scale <= bridgeEndX) {
                    if (this._entity.y + this._entity.scale >= bridgeStartY - doorHeight  && this._entity.y - this._entity.scale <= bridgeStartY) {
                        this._entity.isEnterToBridgeState = 1
                        this._entity.isEnterToBridge = true
                    }
    
                    if (this._entity.y + this._entity.scale >= bridgeEndY && this._entity.y - this._entity.scale <= bridgeEndY + doorHeight) {
                        this._entity.isEnterToBridgeState = 1
                        this._entity.isEnterToBridge = true
                    }
                }
            } else if (this._entity.y - this._entity.scale < bridgeStartY - doorHeight || this._entity.y + this._entity.scale > bridgeEndY + doorHeight) {
                this._entity.isEnterToBridgeState = 0
                this._entity.isEnterToBridge = false
            }
        }

        if (this._entity.isEnterToBridge) {
            this._entity.isUnderOfBridge = false
        }

        for (let i = 0; i < 2; i++) {
            const sideX = [ "left", "right" ][i]
            const handrailX = sideX === "left" ? bridgeStartX : bridgeEndX - handrailWidth
            const isLeftSideCol = this._entity.x + this._entity.scale >= handrailX
            const isRightSideCol = this._entity.x - this._entity.scale <= handrailX + handrailWidth
            const isUpSideCol = this._entity.y + this._entity.scale >= bridgeStartY
            const isDownSideCol = this._entity.y - this._entity.scale <= bridgeEndY

            if (isUpSideCol && isDownSideCol && this._entity.isEnterToBridge) {
                if (isLeftSideCol && isRightSideCol) {
                    const handrail = new utils.Point(handrailX + (sideX === "left" ? handrailWidth / 2 : -(handrailWidth / 2)), 0, 0, 0)
                    const dx = this._entity.x - handrail.x

                    this._entity.xVel = 0

                    let length = this._entity.scale + handrailWidth

                    if (Math.abs(dx) <= length) {
                        let magnitude = Math.sqrt(dx * dx)

                        if (magnitude <= this._entity.scale) {
                            this._entity.position.sub(magnitude * Math.cos(this._entity.moveAngle || Math.atan(this._entity.x - handrail.x)), 0)
                        }
                    }

                    if (this._entity.x + this._entity.scale < handrailX + handrailWidth && sideX === "right") {
                        this._entity.x = handrailX - this._entity.scale
                    } else if (this._entity.x - this._entity.scale > handrailX && sideX === "left") {
                        this._entity.x = handrailX + handrailWidth + this._entity.scale
                    }
                }
            }

            for (let j = 0; j < 2; j++) {
                const fastener = new utils.Point(handrailX + handrailWidth / 2, [ bridgeStartY, bridgeEndY ][j], 0, 0)

                const dx = this._entity.x - fastener.x
                const dy = this._entity.y - fastener.y

                let length = this._entity.scale + fastenerRadius

                if (Math.abs(dx) <= length || Math.abs(dy) <= length) {
                    let magnitude = Math.sqrt(dx * dx + dy * dy) - length

                    if (magnitude <= 0) {
                        const angle = fastener.angleTo(this._entity)

                        this._entity.position.sub(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
                    }
                }
            }
        }
    }

    update(delta) {
        const entityEid = this._entity.eid

        if (this.checkPlayers) {
            const socketsInViewport = Object.keys(this._entity._socket.updater.socketsInViewport)

            for (const socketId of socketsInViewport) {
                if (+socketId === +this._entity._socket.socketId) continue

                const socket = network.server.slots.get(+socketId)

                if (typeof socket !== 'object') continue

                const { player } = socket

                if (!player?.isPlaying) continue
                if (this._entity.isUnderOfBridge !== player.isUnderOfBridge) continue

                const dx = this._entity.x - player.x
                const dy = this._entity.y - player.y

                let length = this._entity.scale + player.scale

                if (Math.abs(dx) <= length || Math.abs(dy) <= length) {
                    length = this._entity.scale + (player.getScale ? player.getScale() : player.scale)

                    let magnitude = Math.sqrt(dx * dx + dy * dy) - length

                    if (magnitude <= 0) {
                        const angle = player.angleTo(this._entity)

                        magnitude /= 2

                        this._entity.position.sub(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
                        player.position.add(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
                    }
                }
            }
        }

        if (this.checkAnimals) {
            const animalsInViewport = Object.keys(this._entity._socket.updater.animalsInViewport)
    
            for (const animalId of animalsInViewport) {
                const animal = animals.get(+animalId)

                if (typeof animal !== 'object') continue

                if (animal.eid === this._entity.eid && this._entity.isAnimal) continue
                if (!animal.animalData.acceptCollisions) continue
                if (this._entity.isUnderOfBridge !== animal.isUnderOfBridge) continue

                const dx = this._entity.x - animal.x
                const dy = this._entity.y - animal.y
                const length = this._entity.scale + animal.scale

                if ((Math.abs(dx) <= length || Math.abs(dy) <= length)) {
                    let magnitude = Math.sqrt(dx * dx + dy * dy) - length

                    if (magnitude <= 0) {
                        const angle = animal.angleTo(this._entity)

                        magnitude /= 2
    
                        this._entity.position.sub(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
                        animal.position.add(magnitude * Math.cos(angle), magnitude * Math.sin(angle))
                    }
                }
            }
        }

        this._entity.isLockMovement = false

        if (this.checkGameObjects) {
            let gameObjectsInViewport = Object.keys(this._entity?._socket?.updater.gameObjectsInViewport || {})

            if (this._entity.isAnimal) {
                gameObjectsInViewport = gameObjects.filter((gameObject) => this._entity.distanceTo(gameObject) < 300)
            }

            for (const gameObjectId of gameObjectsInViewport) {
                const gameObject = typeof gameObjectId === 'object' ? gameObjectId : gameObjects.get(+gameObjectId)

                if (!gameObject) continue

                const dx = this._entity.x - gameObject.x
                const dy = this._entity.y - gameObject.y

                let length = this._entity.scale + gameObject.scale

                if (Math.abs(dx) <= length || Math.abs(dy) <= length) {
                    length = this._entity.scale + gameObject.getScale()

                    const magnitude = Math.sqrt(dx * dx + dy * dy) - length

                    if (magnitude <= 0) {
                        if (!gameObject.isIgnoreCollisions) {
                            const angle = gameObject.angleTo(this._entity)

                            this._entity.position.sub(magnitude * Math.cos(angle), magnitude * Math.sin(angle))

                            this._entity.xVel *= 0.75
                            this._entity.yVel *= 0.75
    
                            if (typeof gameObject.damage !== 'undefined' && entityEid !== gameObject.ownerEid && !this._entity.isGodmode) {
                                this._entity.xVel += 1.5 * Math.cos(angle)
                                this._entity.yVel += 1.5 * Math.sin(angle)
    
                                this._entity.changeHealth(-gameObject.damage, true, gameObject.owner, gameObject)
                            }
                        } else {
                            if (gameObject.isItem) {
                                const itemData = gameObject.itemData

                                if (itemData.speedAffect && !this._entity.isCantBoosting) {
                                    const weightMult = this._entity.isAnimal ? this._entity.animalData.weightMult : 1

                                    this._entity.xVel += (itemData.speedAffect * weightMult) * Math.cos(gameObject.dir)
                                    this._entity.yVel += (itemData.speedAffect * weightMult) * Math.sin(gameObject.dir)
                                }

                                if (itemData.stopMovevement && gameObject.ownerEid !== entityEid) {
                                    this._entity.isLockMovement = true
                                    
                                    if (gameObject.isHideFromEnemies) {
                                        gameObject.isHideFromEnemies = false

                                        gameObject.sendToSocketsWhoSeeMe((socket) => {
                                            socket.sendAddGameObject(gameObject.getInitData())
                                        })
                                    }                                
                                }
                            }
                        }
                    }
                }
            }
        }

        if (this.checkGameMap) {
            const gameMapCol = this.checkBox(
                this._entity.scale, this._entity.scale, 
                config.map.width - this._entity.scale, config.map.height - this._entity.scale
            )

            this.collideGameMap(gameMapCol.left, gameMapCol.right, gameMapCol.top, gameMapCol.bottom)
        }
    }
}

export default Collisions