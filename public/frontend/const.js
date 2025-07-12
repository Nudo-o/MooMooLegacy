import Canvas from "./scene/Canvas.js"
import Context from "./scene/Context.js"
import Network from "./network/Network.js"
import UIControl from "./uicontrol/UIControl.js"
import Renderer from "./renders/Renderer.js"
import Camera from "./renders/Camera.js"
import Boundings from "./renders/components/Boundings.js"
import Players from "./managers/Players.js"
import Images from "./textures/Images.js"
import Grid from "./renders/components/Grid.js"
import DeathText from "./renders/components/DeathText.js"
import GameObjects from "./managers/GameObjects.js"
import Sprites from "./textures/Sprites.js"
import Minimap from "./renders/components/Minimap.js"
import FadeTexts from "./managers/FadeTexts.js"
import Background from "./renders/components/Background.js"
import Bridge from "./renders/components/Bridge.js"
import Animals from "./managers/Animals.js"

export const mouse = {
    x: 0,
    y: 0
}
export const clickWarp = {
    active: false,
    renderRotation: 0,
    get x() {
        return (mouse.x / gameCanvas.scale) + (camera.x - gameCanvas.scaledWidth / 2)
    },
    get y() {
        return (mouse.y / gameCanvas.scale) + (camera.y - gameCanvas.scaledHeight / 2)
    }
}
export const keys = new Map()

export const images = new Images()
export const sprites = new Sprites()
export const ui = new UIControl()
export const network = new Network()
export const gameCanvas = new Canvas()
export const gameContext = new Context(gameCanvas.context)
export const renderer = new Renderer()
export const camera = new Camera()
export const background = new Background()
export const boundigs = new Boundings()
export const grid = new Grid()
export const bridge = new Bridge()
export const deathText = new DeathText()
export const minimap = new Minimap()
export const players = new Players()
export const gameObjects = new GameObjects()
export const animals = new Animals()
export const fadeTexts = new FadeTexts()
export const im = players.add(null, null, -999999, -999999, 0)