import Entity from "./Entity.js"
import config from "../../config.json" with { type: "json" }
import items from "../../items.json" with { type: "json" }
import Collisions from "./Collisions.js"
import moveEntity from "./moveEntity.js"
import { animals, gameObjects, legacyLogger, network } from "../const.js"
import utils from "../../utils/index.js"
import Socket from "../network/socket/Socket.js"

const { player } = config

class Player extends Entity {
    constructor(_parentSocket) {
        super(_parentSocket.socketId, -999999, -999999, 0, player.scale, player.maxHealth)

        this._socket = _parentSocket

        this.nickname = null

        this._moveSpeed = config.player.moveSpeed
        this.moveAngle = null
        this.xVel = 0
        this.yVel = 0

        this.inventory = utils.removeProto(config.startInventory)
        this.weaponIndex = this.inventory.weapons[0]
        this.itemIndex = -1
        this.itemsCount = {}
        this.hatIndex = -1
        this.hats = {}
        this.resources = utils.removeProto(config.startResources)

        this.age = 1
        this.xp = 0
        this.maxXp = 300

        this.skinIndex = 0

        this.attackState = false
        this.autoAttack = false
        this.isAttacking = false
        this.attackTimer = 0

        this.amountWindmillsGold = 0

        this.upgradesList = []

        this.lastSentLeaderboardData = null
        this.lastWindmillsGold = 1000
        this.lastHealthRegen = 1000
        this.lastDamageDoer = void 0
        
        this.isPlaying = false
        this.isKilled = false
        this.isCreated = false
        this.isMoving = false
        this.isPlayer = true
        this.isAFK = false
        
        this.isDeveloper = false
        this.isAdmin = false
        this.isGodmode = false

        this.collisions = new Collisions(this, {
            checkGameMap: true,
            checkPlayers: true,
            checkAnimals: true,
            checkGameObjects: true,
            checkBridge: true
        })
    }

    get weapon() {
        return items.weapons[this.weaponIndex]
    }

    get item() {
        return items.items[this.itemIndex]
    }
    
    get hat() {
        return items.hats[this.hatIndex]
    }

    get damage() {
        return this.weapon.damage * (this.hat?.damageAffect || 1)
    }

    get moveSpeed() {
        return (
            this._moveSpeed * 
            (this.weapon?.speedAffect || 1) * 
            (this.hat?.speedAffect || 1) * 
            (this.itemIndex !== -1 ? .5 : 1) *
            this.speedMult
        ) * this.slowMult
    }

    getInitData() {
        return [
            this.eid,
            this.nickname,
            this.x,
            this.y,
            this.dir,
            this.scale,
            this.skinIndex,
            this.isAdmin,
            this.health,
            this.maxHealth,
            this.isGodmode,
            this.isDeveloper
        ]
    }

    getUpdateData() {
        return [
            this.eid,
            this.x,
            this.y,
            this.dir,
            this.weaponIndex,
            this.itemIndex,
            this.hatIndex,
            this.isUnderOfBridge ? 1 : this.isEnterToBridge ? 2 : 0
        ]
    }

    setNickname(_nickname) {
        this.nickname = _nickname
    }

    setSkinIndex(_skinIndex) {
        this.skinIndex = _skinIndex
    }

    setDir(_dir) {
        this.dir = _dir
    }

    setMoveAngle(_moveAngle) {
        this.moveAngle = _moveAngle
    }

    setIsAdmin(_isAdmin) {
        this.isAdmin = _isAdmin

        this.deleteMeForAll()
    }

    setIsDeveloper(_isDeveloper) {
        this.isDeveloper = _isDeveloper
        
        this.setIsAdmin(this.isDeveloper)
    }

    setIsGodmode(_isGodmode) {
        this.isGodmode = _isGodmode

        this.deleteMeForAll()
    }

    setAttackState(_state) {
        if (this.itemIndex !== -1) return

        this.attackState = _state
    }

    setResource(type, value) {
        this.resources[type] = value
    }

    setWeaponIndex(_weaponIndex) {
        if (!this.inventory.weapons.includes(_weaponIndex)) return

        this.setItemIndex(-1)

        this.weaponIndex = _weaponIndex
    }

    setItemIndex(_itemIndex) {
        if (!this.inventory.items.includes(_itemIndex) && _itemIndex !== -1) return

        _itemIndex = _itemIndex === this.itemIndex ? -1 : _itemIndex

        if (_itemIndex !== -1) {
            if (!this.hasResources(items.items[_itemIndex])) {
                _itemIndex = -1
            }
        }

        this.itemIndex = _itemIndex

        if (this.itemIndex !== -1) {
            this.attackState = false
        }
    }

    setItemCount(groupId, amount) {
        !this.itemsCount[groupId] && (this.itemsCount[groupId] = 0)
        this.itemsCount[groupId] += amount

        this._socket.sendUpdateItemsCount()
    }

    setWeapons(weaponId, weaponPosition) {
        this.inventory.weapons[weaponPosition] = weaponId

        this.setWeaponIndex(weaponId)
        this._socket.sendUpdateInventory()
    }

    setItems(itemId) {
        const currentItem = items.items[this.itemIndex]
        const item = items.items[itemId]
        const itemGroup = items.groups[item.groupId]
        
        this.inventory.items[itemGroup.id] = itemId

        if (currentItem) {
            if (currentItem.groupId === item.groupId) {
                this.setItemIndex(itemId)
            }
        }

        this._socket.sendUpdateInventory()
    }

    setHatIndex(_hatIndex) {
        this.hatIndex = _hatIndex
    }

    setIsAFK(_isAFK) {
        this.isAFK = _isAFK

        this.sendToSocketsWhoSeeMe((socket) => {
            socket.sendAFKState(this.eid, this.isAFK)
        })
    }

    toggleAutoAttack() {
        this.autoAttack = !this.autoAttack
    }

    changeHealth(amount, isShowFadeText, doer, gameObjectDoer) {
        if (amount < 0 && this.isGodmode) return

        const oldHealth = Math.round(this.health)
        const newHealth = Math.round(this.health + amount)

        this.setHealth(newHealth)

        this.sendToSocketsWhoSeeMe((socket) => {
            socket.sendChangeHealth(this.eid, this.health, isShowFadeText || false)
        })

        doer && (this.lastDamageDoer = doer)
        this.health <= 0 && this.kill(doer, gameObjectDoer)

        return Math.abs(newHealth - oldHealth)
    }

    changeResource(type, amount) {
        if (typeof this.resources[type] === 'undefined') return

        const newValue = this.resources[type] + amount
        
        this.setResource(type, newValue)
        this._socket.sendChangeResource(type, parseInt(this.resources[type]))
    }

    changeXp(amount) {
        this.xp += amount

        let sendData = [ this.xp ]

        if (this.xp >= this.maxXp) {
            this.xp = 0
            this.age += 1
            this.maxXp *= 1.2

            if (typeof config.upgradesList[this.age] !== 'undefined') {
                this.upgradesList.push(utils.removeProto(config.upgradesList[this.age]))
            }

            sendData.push(this.maxXp, this.age)
            this._socket.sendUpdateUpgrades()
        }

        this._socket.sendChangeXp(...sendData)
    }

    hasResources(item) {
        if (!item.requiredResources?.length) return

        for (const requiredResource of item.requiredResources) {
            if (this.resources[requiredResource[0]] < requiredResource[1]) {
                return false
            }
        }

        return true
    }

    useResources(item, isAdd) {
        if (!item.requiredResources?.length) return

        for (const requiredResource of item.requiredResources) {
            this.changeResource(requiredResource[0], requiredResource[1] * (isAdd ? 1 : -1))
        }
    }

    useItem(angle) {
        if (!this.item) return

        const itemGorup = items.groups[this.item.groupId]
        const itemCount = this.itemsCount[this.item.groupId] || 0

        if (!this.hasResources(this.item)) return this.setItemIndex(-1)

        if (itemGorup.place && itemCount < itemGorup.limit) {
            const placeAngle = angle
            const placeZoneScale = this.scale + this.item.scale + (this.item.placeOffset || 0)
            const placeX = this.x + placeZoneScale * Math.cos(placeAngle)
            const placeY = this.y + placeZoneScale * Math.sin(angle)

            if (!gameObjects.checkItemLocation(placeX, placeY, this.item.scale, 0.6)) return

            const eid = gameObjects.generateEid()

            this.useResources(this.item)
            gameObjects.addItemObject(eid, placeX, placeY, placeAngle, this.item, this.eid)

            if (itemGorup.name === "windmills") {
                this.amountWindmillsGold += this.item.goldPerSecond
            }

            this.setItemCount(this.item.groupId, 1)

            return this.setItemIndex(-1)
        }

        if (itemGorup.name === "foods" && this.health !== this.maxHealth) {
            this.useResources(this.item)
            this.changeHealth(this.item.healValue, true)
            this.setItemIndex(-1)
        } else {
            this.setItemIndex(-1)
        }
    }

    startAttackTimer() {
        if (!this.attackState && !this.autoAttack) return
        if (this.isAttacking) return

        this.slowMult -= .3
        this.slowMult < 0 && (this.slowMult = 0)

        this.attackTimer = this.weapon.speed
        this.isAttacking = true

        const hittedEntities = this.collisions.checkHitCollisions()

        for (const entityId of hittedEntities) {
            if (entityId[0] === 0) {
                const socket = network.server.slots.get(entityId[1])

                if (typeof socket !== 'object') continue

                const damaged = socket.player.changeHealth(-this.damage, true, this)

                if (this.hat?.healAfterHit && this.health !== this.maxHealth) {
                    this.changeHealth(damaged * this.hat.healAfterHit, true, this)
                }

                if (socket.player.hat?.damageAfterHitMe) {
                    this.changeHealth(-(damaged * socket.player.hat.damageAfterHitMe), false, socket.player)
                }

                socket.player.doHitPush(this.angleTo(socket.player))
            } else if (entityId[0] === 1) {
                const gameObject = gameObjects.get(entityId[1])

                if (!gameObject) continue

                gameObject.doWiggle(this.angleTo(gameObject))

                if (!gameObject.isItem) {
                    const resourceType = [ "wood", "food", "stone", "gold" ][gameObject.resourceType]
                    const oldResource = this.resources[resourceType]

                    this.changeResource(resourceType, this.weapon.gatherValue)
                    this.changeXp(Math.abs(this.resources[resourceType] - oldResource) * 4)
                } else {
                    if (gameObject.groupData.name === "mines") {
                        this.changeResource(gameObject.itemData.gather.type, gameObject.itemData.gather.amount)
                    } else {
                        gameObject.changeHealth(-this.damage, this)
                    }
                }
            } else if (entityId[0] === 2) {
                const animal = animals.get(entityId[1])

                if (typeof animal !== 'object') continue

                const damaged = animal.changeHealth(-this.damage, true, this)

                if (this.hat?.healAfterHit && this.health !== this.maxHealth) {
                    this.changeHealth(damaged * this.hat.healAfterHit, true, this)
                }

                animal.doHitPush(this.angleTo(animal))
            }
        }

        this.sendToSocketsWhoSeeMe((socket) => {
            socket.sendAttackAnimation(this.eid, Boolean(hittedEntities.length))
        })
    }

    stopAttackTimer() {
        this.attackTimer = 0
        this.isAttacking = false
    }

    updateAttackTimer(delta) {
        if (this.attackTimer <= 0 || !this.isAttacking) return this.stopAttackTimer()
        
        this.attackTimer -= delta
    }

    doHitPush(angle) {
        const speed = 0.3

        this.xVel += speed * Math.cos(angle)
        this.yVel += speed * Math.sin(angle)
    }

    deleteMeForAll() {
        const socketsInViewport = Object.keys(this._socket?.updater?.socketsInViewport || {})

        for (const socketId of socketsInViewport) {
            const socket = network.server.slots.get(+socketId)

            if (typeof socket !== 'object') continue

            delete socket.updater.socketsInViewport[this._socket.socketId.toString()]
        }

        this.sendToSocketsWhoSeeMe((socket) => {
            if (typeof socket !== 'object') return

            socket.sendRemovePlayer(this.eid)
        })
    }

    spawn() {
        this.setRandomPosition("grass")

        this.health = this.maxHealth
        this.xVel = this.yVel = 0
        this.slowMult = 1
        this.inventory = utils.removeProto(config.startInventory)
        this.weaponIndex = this.inventory.weapons[0]
        this.itemIndex = -1
        this.attackState = false
        this.autoAttack = false
        this.isAttacking = false
        this.attackTimer = 0
        this.age = 1
        this.xp = 0
        this.maxXp = 300
        this.amountWindmillsGold = 0
        this.resources = utils.removeProto(config.startResources)
        this.itemsCount = {}
        this.upgradesList = []
        this.isKilled = false
        this.isPlaying = true
        this.isCreated = true

        this._socket.sendUpdateInventory()
        this.changeResource("gold", 0)
        this.changeResource("food", 0)
        this.changeResource("wood", 0)
        this.changeResource("stone", 0)
        this.setIsAFK(false)
        this.resetPhysics()
    }

    kill(doer, gameObjectDoer) {
        if (this.isKilled) return
        
        this.isKilled = true
        this.isPlaying = false

        doer && doer.changeResource(this.age * 100)

        this.deleteMeForAll()
        gameObjects.removeAllGameObjectsByOwner(this.eid)
        this._socket.sendKillPlayer()

        doer && legacyLogger.emit("kill-player", `[${this.eid}]${this.nickname}`, `[${doer.eid}]${doer.nickname}`, !gameObjectDoer ? void 0 : `[${gameObjectDoer?.eid}]${gameObjectDoer?.itemData.name}`)
    }

    update(delta) {
        if (!this.isPlaying) return

        this.isMoving = this.moveAngle !== null

        if ((this.attackState || this.autoAttack) && !this.isAttacking && this.attackTimer <= 0 && this.itemIndex === -1) {
            this.startAttackTimer()
        }

        if (this.isAttacking) {
            this.updateAttackTimer(delta)
        }

        moveEntity(this, player.moveDecel, delta)
        this.updatePhysics()

        if (!this.lastSentLeaderboardData || (Date.now() - this.lastSentLeaderboardData) >= config.updateLeaderboardTime) {
            this._socket.sendUpdateLeaderboard()

            this.lastSentLeaderboardData = Date.now()
        }

        if (this.lastWindmillsGold > 0) {
            this.lastWindmillsGold -= delta
        } else {
            this.changeResource("gold", this.amountWindmillsGold)
            this.changeXp(this.amountWindmillsGold)

            this.lastWindmillsGold = 1000
        }

        if (this.lastHealthRegen > 0) {
            this.lastHealthRegen -= delta
        } else {
            const regenAmount = this.hat?.healthRegen || 0

            if (regenAmount) {
                this.changeHealth(regenAmount, false, this)
            }

            this.lastHealthRegen = 1000
        }
    }
}

export default Player