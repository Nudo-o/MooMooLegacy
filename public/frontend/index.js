import { clickWarp, gameObjects, im, images, keys, mouse, network, ui } from "./const.js"
import * as _ from "./const.js"
import config from "../../config.json"
import utils from "../../utils/index.js"

window._ = _

ui.gameNicknameInput.setValue(localStorage.getItem("moo_legacy_nickname" || ""))

ui.gameNicknameInput.on("blur", () => {
    ui.gameNicknameInput.value = utils.formatString(ui.gameNicknameInput.value, config.maxNicknameLength)
})

ui.enterGame.addEventListener("click", () => {
    if (!event.isTrusted) return
    if (!network.socket.isReady) return

    ui.emit("show-gameui")
    network.socket.sendEnterGame()
    gameObjects.clear()
    localStorage.setItem("moo_legacy_nickname", ui.gameNicknameInput.getValue())
})

ui.gui.toggleShopBtn.addEventListener("click", ui.gui.toggleShop.bind(ui.gui))

ui.gui.gameUI.on("mousedown", (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!event.isTrusted) return

    if (!im.isPlaying) return
    if (ui.isInputFocused() || event.target.classList.contains("prevent-click")) return

    if (im.isAdmin) {
        if (event.button === 1) {
            clickWarp.active = !clickWarp.active

            return
        }
    
        if (clickWarp.active && event.button === 0) {
            clickWarp.active = false

            return network.socket.send("998", clickWarp.x, clickWarp.y)
        }
    }
        
    if (event.button !== 0) {
        return network.socket.sendSelectItem(false, -1)
    }

    network.socket.sendAttackState(true)
    network.socket.sendUseItem()
})

ui.gui.gameUI.on("mouseup", () => {
    if (!event.isTrusted) return

    network.socket.sendAttackState(false)
})

ui.gui.gameUI.addEventListener("mousemove", (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!event.isTrusted) return
    if (event.target.classList.contains("prevent-click")) return

    mouse.x = event.clientX
    mouse.y = event.clientY
})

window.addEventListener("keydown", (event) => {
    if (!event.isTrusted) return

    const keyCode = event.code

    if (!im.isPlaying) return
    if (keys.get(event.code)) return

    if (keyCode === config.keys.hideWindows) ui.gui.hideTempWindows()

    if (ui.isInputFocused()) return

    keys.set(event.code, true)

    if (keyCode === config.keys.autoAttack) network.socket.sendAutoAttack()
    if (keyCode === config.keys.lockWatchDir) im.isLockWatchDir = !im.isLockWatchDir
    if (keyCode === config.keys.selectFood) network.socket.sendSelectItem(false, im.inventory.items[0])

    if (keyCode === config.keys.useItemOnKey) {
        network.socket.sendUseItem()
    }
    
    const keyId = event.which || event.keyCode

    if (typeof im.inventory.weapons[keyId - 49] !== 'undefined') {
        return network.socket.sendSelectItem(true, im.inventory.weapons[keyId - 49])
    }

    if (typeof im.inventory.items[keyId - 49 - im.inventory.weapons.length] !== 'undefined') {
        return network.socket.sendSelectItem(false, im.inventory.items[keyId - 49 - im.inventory.weapons.length])
    }
})

window.addEventListener("keyup", (event) => {
    if (!event.isTrusted) return

    const keyCode = event.code

    keys.set(keyCode, false)

    if (!im.isPlaying) return 

    if ([ config.keys.chatValueBack, config.keys.chatValueForward ].includes(keyCode) && !ui.gui.chatHolder.hasClass("hidden")) {
        ui.gui.chatHistoryIndex += keyCode === config.keys.chatValueBack ? -1 : keyCode === config.keys.chatValueForward ? 1 : 0
        ui.gui.chatHistoryIndex = Math.max(0, Math.min(ui.gui.chatHistoryIndex, ui.gui.chatHistory.length - 1))

        if (ui.gui.chatHistory[ui.gui.chatHistoryIndex]) {
            ui.gui.chatInput.setValue(ui.gui.chatHistory[ui.gui.chatHistoryIndex])
        }
    }

    if (keyCode === config.keys.chat) {
        ui.gui.toggleChat()

        if (ui.gui.chatHolder.hasClass("hidden")) {
            const chatMessage = ui.gui.chatInput.getValue()

            if (chatMessage) {
                ui.gui.chatHistory.push(chatMessage)
                ui.gui.chatHistory = ui.gui.chatHistory.reverse()
            }

            if (ui.gui.chatHistory.length > config.chatHistorySize) {
                ui.gui.chatHistory.shift()
            }

            network.socket.sendChatMessage(chatMessage)
            ui.gui.chatInput.setValue("")

            ui.gui.chatHistoryIndex = -1
        } else {
            ui.gui.chatHistoryIndex !== -1 && ui.gui.chatInput.setValue(ui.gui.chatHistory[ui.gui.chatHistoryIndex])
        }
    }
})

window.addEventListener("blur", () => network.socket.sendAFKState(true))
window.addEventListener("focus", () => network.socket.sendAFKState(false))

images.loadAllImages().then(() => {
    network.socket.connect().then(() => {
        ui.emit("show-homepage")
    })
})