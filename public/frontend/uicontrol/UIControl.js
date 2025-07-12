import utils from "../../../utils/index.js"
import GUIControl from "./GUIControl.js"
import UIAdapter from "./UIAdapter.js"
import config from "../../../config.json"

class UIControl extends UIAdapter {
    constructor() {
        super()

        this.homepage = this.get$("#homepage")
        this.homepageContainer = this.get$("#homepage_container")
        this.homepageHeader = this.get$("#homepage_header")
        this.gameName = this.get$("#game_name")
        this.gameLoading = this.get$("#game_loading")
        this.gameDisconnect = this.get$("#game_disconnect")
        this.gameNicknameInput = this.get$("#game_nickname_input")
        this.enterGame = this.get$("#enter_game")

        this.gui = new GUIControl()

        this.on("show-homepage", this.showHomepage.bind(this))
        this.on("show-disconnect", this.showDisconnect.bind(this))
        this.on("show-gameui", this.showGameui.bind(this))
    }

    isInputFocused() {
        return document.activeElement.tagName === "INPUT"
    }

    showHomepage() {
        this.homepage.show()
        this.homepageContainer.show()
        this.gui.gameUI.hide()
        this.gameLoading.hide()
        this.homepageHeader.classList.remove("is-loading")
    }

    showDisconnect(reason) {
        reason && this.get$("span", this.gameDisconnect).setHtml(reason)
        this.showHomepage()
        this.homepageContainer.hide()
        this.gameDisconnect.show()
    }

    showGameui() {
        this.homepage.hide()
        this.gui.showGui()
    }
}

export default UIControl