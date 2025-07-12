import { im, network, ui } from "../../../../const.js"

function getLeaderboardItemHtml(index, nickname, gold, isIm) {
    return `
    <box class="leaderboard-item">
        <span class="${isIm ? "default" : "gray"}-text">${index}. ${nickname}</span>
        <span class="default-text">${gold}</span>
    </box>
    `
}

function onUpdateLeaderboard(data) {
    ui.gui.leaderboardContainer.clearHtml()

    for (let i = 0, index = 1; i < data.length; i += 3) {
        const chunk = data.slice(i, i + 3)
        const [ eid, nickname, gold ] = chunk
        const leaderboardItemHtml = getLeaderboardItemHtml(index, `${im.isAdmin ? `[${eid}]` : ""}${nickname}`, gold, eid === im.eid)

        ui.gui.leaderboardContainer.addHtml(leaderboardItemHtml)

        index += 1
    }
}

export default onUpdateLeaderboard