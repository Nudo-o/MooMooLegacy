import { camera, clickWarp, gameCanvas, gameContext, im, keys, mouse, network, renderer, ui } from "../../../../const.js"
import config from "../../../../../../config.json"
import Vector from "../../../../../../utils/2d/Vector.js"
import layers from "../../../../renders/layers.json"

let lastSystemInfoUpdate = null

function onSetup(socketId) {
    network.socket.setSocketId(socketId)

    renderer.add(1, {
        id: [ ...Object.values(layers) ].filter((layer) => layer.layer === 1).length + 1,
        _function: () => {
            if (!im.isPlaying) return

            if (!lastSystemInfoUpdate || (Date.now() - lastSystemInfoUpdate) >= config.updateSystemInfoTime) {
                ui.gui.pingText.setHtml(Math.round(network.ping))
                ui.gui.fpsText.setHtml(Math.round(renderer.fps))
                network.socket.sendPing()

                lastSystemInfoUpdate = Date.now()
            }

            if (im.isAdmin) {
                if (ui.gui.chatInput.getAttribute("maxlength") === "30") {
                    ui.gui.chatInput.setAttribute("maxlength", "9999")
                }
            } else {
                if (ui.gui.chatInput.getAttribute("maxlength") !== "30") {
                    ui.gui.chatInput.setAttribute("maxlength", "30")
                }
            }

            if (!im.isLockWatchDir) {
                const mouseX = mouse.x / gameCanvas.scale
                const mouseY = mouse.y / gameCanvas.scale
                const playerPosition = new Vector(im.render.x, im.render.y)
                const mouseDir = parseFloat(playerPosition.angleTo(mouseX, mouseY))

                if (!network.socket.lastSentWatchAngle || renderer.nowUpdate - network.socket.lastSentWatchAngle >= (1000 / config.tickRateDiv - 1)) {                
                    if (im.oldTickDir !== mouseDir) {
                        network.socket.sendWatchAngle(mouseDir)
            
                        network.socket.lastSentWatchAngle = renderer.nowUpdate
                    }
                }

                im.mouseAngle = mouseDir
            }

            if (ui.isInputFocused()) return

            const clone = im.clone
            const left = keys.get(config.keys.left)
            const right = keys.get(config.keys.right)
            const up = keys.get(config.keys.up)
            const down = keys.get(config.keys.down)
            const xDir = left && !right ? -1 : !left && right ? 1 : 0
            const yDir = up && !down ? -1 : !up && down ? 1 : 0

            if (xDir !== 0 || yDir !== 0) {
                clone.position.add(xDir, yDir)
                clone.updatePhysics()
    
                const moveAngle = im.angleTo(clone)

                if (moveAngle != im.moveAngle) {
                    network.socket.sendMoveAngle(moveAngle)
                }

                im.moveAngle = moveAngle
            } else if (im.moveAngle !== null) {
                network.socket.sendMoveAngle(null)

                im.moveAngle = null
            }
        }
    })
    
    renderer.add(3, {
        id: [ ...Object.values(layers) ].filter((layer) => layer.layer === 3).length + 1,
        _function: () => {
            if (im.isAdmin && clickWarp.active) {
                const scale = 40

                gameContext.ctx.save()
                gameContext.ctx.strokeStyle = config.darkGeneralStroke
                gameContext.ctx.lineWidth = config.generalStrokeWidth
                gameContext.ctx.fillStyle = "#ffffff"
                gameContext.ctx.globalAlpha = .5

                gameContext.ctx.translate(clickWarp.x - camera.xOffset, clickWarp.y - camera.yOffset)
                gameContext.ctx.rotate(clickWarp.renderRotation)
                gameContext.drawBlob(gameContext.ctx, 6, scale, .7 * scale, false)
                gameContext.ctx.fill()
                gameContext.ctx.stroke()

                gameContext.ctx.fillStyle = config.darkGeneralStroke

                gameContext.drawBlob(gameContext.ctx, 6, scale / 4, .7 * scale / 4, false)
                gameContext.ctx.fill()
                gameContext.ctx.restore()

                clickWarp.renderRotation += .0005 * renderer.delta
            }
        }
    })
}

export default onSetup