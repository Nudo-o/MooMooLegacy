import express from "express"
import path from "path"
import { WebSocketServer } from "ws"
import { fileURLToPath } from "url"
import { network } from "./server/const.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const port = 3000
const wss = new WebSocketServer({ noServer: true })

wss.on("connection", network.server.emit.bind(network.server, "connection"))

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`)
}).on("upgrade", (request, socket, head) => {
    if (request.url === "/socket") {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit("connection", ws, request)
        })
    }
})

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/dist/index.html"))
})

app.get("/style.css", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "/dist/style.css"))
})

app.get("/js/moomoo_io_legacy.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "/dist/js/moomoo_io_legacy.js"))
})