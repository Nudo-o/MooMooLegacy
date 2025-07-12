import config from "../../../config.json"
import items from "../../../items.json"
import { im, network, sprites, ui } from "../const.js"
import UIAdapter from "./UIAdapter.js"

class GUIControl extends UIAdapter {
    constructor() {
        super()

        this.gameUI = this.get$("#gameui")
        this.deathText = this.get$("#death_text")
        this.leaderboardHolder = this.get$("#leaderboard_holder")
        this.leaderboardContainer = this.get$("#leaderboard_container")
        this.itemsBarHolder = this.get$("#items_bar_holder")
        this.ageText = this.get$("#age_text")
        this.ageBar = this.get$("#age_bar")
        this.resourcesHolder = this.get$("#resources_holder")
        this.goldText = this.get$("#gold_text")
        this.foodText = this.get$("#food_text")
        this.woodText = this.get$("#wood_text")
        this.stoneText = this.get$("#stone_text")
        this.chatHolder = this.get$("#chat_holder")
        this.chatInput = this.get$("#chat_input")
        this.inventoryBarWeapons = this.get$("#inventory_bar_weapons")
        this.inventoryBarItems = this.get$("#inventory_bar_items")
        this.upgradesBarWeapons = this.get$("#upgrades_bar_weapons")
        this.upgradesBarItems = this.get$("#upgrades_bar_items")
        this.upgradesBarCount = this.get$("#upgrades_bar_count")
        this.itemInfoWrapper = this.get$("#item_info_wrapper")
        this.toggleShopBtn = this.get$("#toggle_shop_btn")
        this.shopHolder = this.get$("#shop_holder")
        this.shopHatsContainer = this.get$("#shop_hats_container")
        this.pingText = this.get$("#ping_text")
        this.fpsText = this.get$("#fps_text")

        this.chatHistory = []
        this.chatHistoryIndex = -1

        this.on("show-kill-elements", () => {
            this.showDeathText()

            setTimeout(ui.showHomepage.bind(ui), config.deathFadeout)
        })
    }

    showGui() {
        this.gameUI.show()
        this.itemsBarHolder.show()
        this.leaderboardHolder.show()
        this.resourcesHolder.show()
        this.itemsBarHolder.show()
        this.chatHolder.hide()
        this.itemInfoWrapper.hide()
        this.shopHolder.hide()
        this.deathText.hide()
    }

    showDeathText() {
        this.itemsBarHolder.hide()
        this.leaderboardHolder.hide()
        this.chatHolder.hide()
        this.itemInfoWrapper.hide()
        this.resourcesHolder.hide()
        this.itemsBarHolder.hide()
        this.shopHolder.hide()
        this.deathText.show()
    }

    showItemInfoPanel(isWeapon, itemId, isHat) {
        const item = isWeapon ? items.weapons[itemId] : isHat ? items.hats[itemId] : items.items[itemId]
        const itemInfoName = this.get$("#item_info_name", this.itemInfoWrapper)
        const itemInfoDesc = this.get$("#item_info_desc", this.itemInfoWrapper)
        const itemInfoWeapon = this.get$("#item_info_weapon", this.itemInfoWrapper)
        const itemInfoRequiredList = this.get$("#item_info_required_list", this.itemInfoWrapper)
        const itemInfoCount = this.get$("#item_info_count", this.itemInfoWrapper)

        if (isWeapon) {
            itemInfoWeapon.setHtml("primary")
            itemInfoWeapon.show()
        } else if (!isHat) {
            if (item.requiredResources?.length) {
                for (const requiredResource of item.requiredResources) {
                    const itemInfoRequired = this.get$(`#item_info_required_${requiredResource[0]}`, this.itemInfoWrapper)
                
                    itemInfoRequired.setHtml(`${requiredResource[0]} <span class="item-info-prop gray-text">x${requiredResource[1]}</span>`)
                    itemInfoRequired.show()
                }
    
                itemInfoRequiredList.show()
            }

            const itemGroupData = items.groups[item.groupId]

            if (itemGroupData.place) {
                itemInfoCount.setHtml(`${im.itemsCount[item.groupId] || 0}/${itemGroupData.limit}`)
                itemInfoCount.show()
            }
        }

        itemInfoName.setHtml(item.name)
        itemInfoDesc.setHtml(item.desc)
        this.itemInfoWrapper.show()
    }

    hideTempWindows() {
        this.chatHolder.hide()
        this.shopHolder.hide()
    }

    hideItemInfoPanel() {
        const itemInfoName = this.get$("#item_info_name", this.itemInfoWrapper)
        const itemInfoDesc = this.get$("#item_info_desc", this.itemInfoWrapper)
        const itemInfoWeapon = this.get$("#item_info_weapon", this.itemInfoWrapper)
        const itemInfoRequiredList = this.get$("#item_info_required_list", this.itemInfoWrapper)
        const itemInfoCount = this.get$("#item_info_count", this.itemInfoWrapper)

        this.itemInfoWrapper.hide()
        itemInfoName.setHtml("")
        itemInfoDesc.setHtml("")
        itemInfoCount.setHtml("")
        itemInfoWeapon.hide()
        itemInfoRequiredList.hide()
        itemInfoCount.hide()

        for (const resourceName of [ "gold", "food", "wood", "stone" ]) {
            const itemInfoRequired = this.get$(`#item_info_required_${resourceName}`, this.itemInfoWrapper)

            itemInfoRequired.setHtml("")
            itemInfoRequired.hide()
        }
    }

    toggleChat() {
        this.shopHolder.hide()
        this.chatHolder.toggle()

        if (!this.chatHolder.hasClass("hidden")) {
            this.chatInput.doFocus()
        }
    }

    toggleShop() {
        this.chatHolder.hide()
        this.shopHolder.toggle()

        if (!this.shopHolder.hasClass("hidden")) {
            this.updateShopHatsList()
        }
    }

    updateAgeBar(ageBarWidthPercentage, ageText) {
        this.ageBar.setWidth(`${ageBarWidthPercentage}%`)
        this.ageText.setHtml(ageText)
    }

    updateInventoryBar(inventory) {
        this.inventoryBarWeapons.setHtml("")
        this.inventoryBarItems.setHtml("")

        const onClick = (isWeapon, itemId) => {
            network.socket.sendSelectItem(isWeapon, itemId)
        }

        for (const weaponIndex of inventory.weapons) {
            const weaponSprite = sprites.getWeaponSprite(weaponIndex, 0, 0, true)
            const id = `inventory_item_${weaponIndex}`

            this.inventoryBarWeapons.insertAdjacentHTML("beforeend", `
            <div class="inventory-bar-item prevent-click" id="${id}" style="background-image: url(${weaponSprite.toDataURL()})"></div>
            `)

            const inventoryItem = this.get$(`#${id}`)

            inventoryItem.on("click", onClick.bind(null, true, weaponIndex))
            inventoryItem.on("mouseover", this.showItemInfoPanel.bind(this, true, weaponIndex, false))
            inventoryItem.on("mouseout", this.hideItemInfoPanel.bind(this))
        }

        for (const itemIndex of inventory.items) {
            const itemSprite = sprites.getItemSprite(items.items[itemIndex], true)
            const id = `inventory_item_${itemIndex + items.items.length}`

            this.inventoryBarItems.insertAdjacentHTML("beforeend", `
            <div class="inventory-bar-item prevent-click" id="${id}" style="background-image: url(${itemSprite.toDataURL()})"></div>
            `)

            const inventoryItem = this.get$(`#${id}`)

            inventoryItem.on("click", onClick.bind(null, false, itemIndex))
            inventoryItem.on("mouseover", this.showItemInfoPanel.bind(this, false, itemIndex, false))
            inventoryItem.on("mouseout", this.hideItemInfoPanel.bind(this))
        }
    }

    updateUpgradesBar(upgrades, upgradesCount) {
        this.upgradesBarWeapons.setHtml("")
        this.upgradesBarItems.setHtml("")
        this.upgradesBarCount.setHtml(`SELECT ITEMS (${upgradesCount})`)
        this.upgradesBarCount.show()

        const onClick = (isWeapon, itemId) => {
            this.upgradesBarWeapons.setHtml("")
            this.upgradesBarItems.setHtml("")
            this.upgradesBarCount.setHtml(`SELECT ITEMS (0)`)
            this.upgradesBarCount.hide()
            network.socket.sendSelectUpgrade(isWeapon, itemId)
            this.hideItemInfoPanel()
        }

        if (Array.isArray(upgrades.weapons)) {
            for (const weaponIndex of upgrades.weapons) {
                const weaponSprite = sprites.getWeaponSprite(weaponIndex, 0, 0, true)
                const id = `upgrade_item_${weaponIndex}`
    
                this.upgradesBarWeapons.insertAdjacentHTML("beforeend", `
                <div class="upgrades-bar-item prevent-click" id="${id}" style="background-image: url(${weaponSprite.toDataURL()})"></div>
                `)
    
                const upgradeItem = this.get$(`#${id}`)
    
                upgradeItem.on("click", onClick.bind(null, true, weaponIndex))
                upgradeItem.on("mouseover", this.showItemInfoPanel.bind(this, true, weaponIndex, false))
                upgradeItem.on("mouseout", this.hideItemInfoPanel.bind(this))
            }
        }

        if (!Array.isArray(upgrades.items)) return

        for (const itemIndex of upgrades.items) {
            const itemSprite = sprites.getItemSprite(items.items[itemIndex], true)
            const id = `upgrade_item_${itemIndex + items.items.length}`

            this.upgradesBarItems.insertAdjacentHTML("beforeend", `
            <div class="upgrades-bar-item prevent-click" id="${id}" style="background-image: url(${itemSprite.toDataURL()})"></div>
            `)

            const upgradeItem = this.get$(`#${id}`)

            upgradeItem.on("click", onClick.bind(null, false, itemIndex))
            upgradeItem.on("mouseover", this.showItemInfoPanel.bind(this, false, itemIndex, false))
            upgradeItem.on("mouseout", this.hideItemInfoPanel.bind(this))
        }
    }

    updateShopHatsList(lastHatId, actionState) {
        this.shopHatsContainer.setHtml("")

        const onClick = (hatId, hatAction) => {
            network.socket.sendSelectEquipment(hatId)

            const hatActionText = hatAction.textContent

            this.updateShopHatsList(hatId, !im.hats[hatId] ? items.hats[hatId].cost : /\d/.test(hatActionText) ? "Equip" : /Equip/.test(hatActionText) ? "Unequip" : "Equip")
        }

        for (const hat of items.hats) {
            if (hat.noSell) continue

            this.shopHatsContainer.insertAdjacentHTML("beforeend", `
            <box class="shop-product-box prevent-click" id="shop_product_${hat.id}">
              <header class="shop-product-header prevent-click">
                <img class="shop-product-preview prevent-click" src="../assets/hats/${hat.src}.png">
                <span class="default-text prevent-click"">${hat.name}</span>
              </header>

              <div class="shop-product-actions prevent-click">
                <div class="shop-product-action prevent-click" id="shop_hat_action_${hat.id}">
                  <span class="prevent-click">
                  ${lastHatId === hat.id ? actionState : 
                    im.hatIndex === hat.id && actionState !== "Unequip" ? "Unequip" : 
                    im.hats[hat.id] ? "Equip" : hat.cost}
                  </span>
                </div>
              </div>
            </box>
            `)

            const hatBox = this.get$(`#shop_product_${hat.id}`, this.shopHatsContainer)
            const hatAction = this.get$(`#shop_hat_action_${hat.id}`, this.shopHatsContainer)

            hatAction.on("click", onClick.bind(null, hat.id, hatAction))
            hatBox.on("mouseover", this.showItemInfoPanel.bind(this, false, hat.id, true))
            hatBox.on("mouseout", this.hideItemInfoPanel.bind(this))
        }
    }
}

export default GUIControl