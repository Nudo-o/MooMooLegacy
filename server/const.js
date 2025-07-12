import LegacyLogger from "./LegacyLogger.js"
import GridArray from "./grid_array/GridArray.js"
import ChatCommands from "./managers/ChatCommands.js"
import GameObjects from "./managers/GameObjects.js"
import Network from "./network/Network.js"
import Animals from "./managers/Animals.js"

// export const DEVELOPER_PASSWORD = "$_NuDo_MMLegacy_0_10_@"
export const DEVELOPER_PASSWORD = "123"
export const ADMIN_PASS = "9063"

export const legacyLogger = new LegacyLogger()
export const gridArray = new GridArray()
export const gameObjects = new GameObjects()
export const animals = new Animals()
export const chatCommands = new ChatCommands()
export const network = new Network()