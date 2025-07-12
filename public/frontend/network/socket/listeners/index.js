import config from "../../../../../config.json"
import onAddAnimal from "./animals/onAddAnimal.js"
import onRemoveAnimal from "./animals/onRemoveAnimal.js"
import onUpdateAnimals from "./animals/onUpdateAnimals.js"
import onAddGameObject from "./game_objects/onAddGameObject.js"
import onGameObjectWiggle from "./game_objects/onGameObjectWiggle.js"
import onRemoveGameObject from "./game_objects/onRemoveGameObject.js"
import onChangeResource from "./hud/onChangeResource.js"
import onChangeXp from "./hud/onChangeXp.js"
import onUpdateInventory from "./hud/onUpdateInventory.js"
import onUpdateLeaderboard from "./hud/onUpdateLeaderboard.js"
import onUpdateUpgrades from "./hud/onUpdateUpgrades.js"
import onAFKState from "./players/onAFKState.js"
import onAddPlayer from "./players/onAddPlayer.js"
import onAttackAnimation from "./players/onAttackAnimation.js"
import onChangeHealth from "./players/onChangeHealth.js"
import onKillPlayer from "./players/onKillPlayer.js"
import onReceiveChatMessage from "./players/onReceiveChatMessage.js"
import onRemovePlayer from "./players/onRemovePlayer.js"
import onUpdateItemsCount from "./players/onUpdateItemsCount.js"
import onUpdatePlayers from "./players/onUpdatePlayers.js"
import onPingResponse from "./setup/onPingResponse.js"
import onSetup from "./setup/onSetup.js"

const { packets } = config
const messageListeners = {}

// SETUP:
messageListeners[packets.SETUP] = onSetup
messageListeners[packets.PING_RESPONSE] = onPingResponse

// PLAYERS:
messageListeners[packets.ADD_PLAYER] = onAddPlayer
messageListeners[packets.REMOVE_PLAYER] = onRemovePlayer
messageListeners[packets.UPDATE_PLAYERS] = onUpdatePlayers
messageListeners[packets.ATTACK_ANIMATION] = onAttackAnimation
messageListeners[packets.CHANGE_HEALTH] = onChangeHealth
messageListeners[packets.KILL_PLAYER] = onKillPlayer
messageListeners[packets.RECEIVE_CHAT_MESSAGE] = onReceiveChatMessage
messageListeners[packets.UPDATE_ITEMS_COUNT] = onUpdateItemsCount
messageListeners[packets.AFK_STATE] = onAFKState

// HUD:
messageListeners[packets.UPDATE_LEADERBOARD] = onUpdateLeaderboard
messageListeners[packets.CHANGE_RESOURCE] = onChangeResource
messageListeners[packets.CHANGE_XP] = onChangeXp
messageListeners[packets.UPDATE_INVENTORY] = onUpdateInventory
messageListeners[packets.UPDATE_UPGRADES] = onUpdateUpgrades

// GAME OBJECTS:
messageListeners[packets.ADD_GAMEOBJECT] = onAddGameObject
messageListeners[packets.REMOVE_GAMEOBJECT] = onRemoveGameObject
messageListeners[packets.GAMEOBJECT_WIGGLE] = onGameObjectWiggle

// ANIMALS:
messageListeners[packets.ADD_ANIMAL] = onAddAnimal
messageListeners[packets.REMOVE_ANIMAL] = onRemoveAnimal
messageListeners[packets.UPDATE_ANIMALS] = onUpdateAnimals


export default messageListeners