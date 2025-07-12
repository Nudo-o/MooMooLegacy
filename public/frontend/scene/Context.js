import utils from "../../../utils/index.js"
import { Rect, Text, Line, Circle, _Image } from "./models/index.js"

class Context {
    constructor(context) {
        this.ctx = context
    }

    create(Model, style) {
        return new Model(this.ctx, style)
    }

    createLine(style) {
        return this.create(Line, style)
    }

    createText(style) {
        return this.create(Text, style)
    }

    createRect(style) {
        return this.create(Rect, style)
    }

    createCircle(style) {
        return this.create(Circle, style)
    }
    
    createImage(style) {
        return this.create(_Image, style)
    }

    drawRect(context, x, y, width, height, stroke) {
        context.fillRect(x - (width / 2), y - (height / 2), width, height)
        !stroke && context.strokeRect(x - (width / 2), y - (height / 2), width, height)
    }

    drawCircle(context, x, y, scale, dontStroke, dontFill) {
        context.beginPath()
        context.arc(x, y, scale, 0, 2 * Math.PI)

        !dontFill && context.fill()
        !dontStroke && context.stroke()
    }

    drawStar(context, spikes, outer, inner) {
        const step = Math.PI / spikes

        let angle = Math.PI / 2 * 3
        let x = 0
        let y = 0
        
        context.beginPath()
        context.moveTo(0, -outer)

        for (let i = 0; i < spikes; i++) {
            x = Math.cos(angle) * outer
            y = Math.sin(angle) * outer

            context.lineTo(x, y)

            angle += step

            x = Math.cos(angle) * inner
            y = Math.sin(angle) * inner

            context.lineTo(x, y)
            
            angle += step
        }

        context.lineTo(0, -outer)
        context.closePath()
    }

    drawBlob(context, spikes, outer, inner, randomOuter = true) {
        const step = Math.PI / spikes

        let angle = Math.PI / 2 * 3
        let x = 0
        let y = 0
        let tmpOuter = 0

        context.beginPath()
        context.moveTo(0, -inner)

        for (let i = 0; i < spikes; i++) {
            tmpOuter = randomOuter ? utils.randInt(outer + 0.9, outer * 1.2) : (outer + 0.9 + outer * 1.2) / 2

            context.quadraticCurveTo(
                Math.cos(angle + step) * tmpOuter, 
                Math.sin(angle + step) * tmpOuter,
                Math.cos(angle + (step * 2)) * inner, 
                Math.sin(angle + (step * 2)) * inner
            )

            angle += step * 2
        }

        context.lineTo(0, -inner)
        context.closePath()
    }

    drawLeaf(context, x, y, length, radius) {
        const endX = x + (length * Math.cos(radius))
        const endY = y + (length * Math.sin(radius))
        const width = length * 0.4

        context.moveTo(x, y)
        context.beginPath()
        context.quadraticCurveTo(
            ((x + endX) / 2) + (width * Math.cos(radius + Math.PI / 2)),
            ((y + endY) / 2) + (width * Math.sin(radius + Math.PI / 2)), 
            endX, endY
        )
        context.quadraticCurveTo(
            ((x + endX) / 2) - (width * Math.cos(radius + Math.PI / 2)),
            ((y + endY) / 2) - (width * Math.sin(radius + Math.PI / 2)),
            x, y
        )
        context.closePath()
        context.fill()
        context.stroke()
    }

    drawRectCircle(context, x, y, s, sw, seg, stroke) {
        context.save();
        context.translate(x, y)

        seg = Math.ceil(seg / 2)

        for (var i = 0; i < seg; i++) {
            this.drawRect(context, 0, 0, s * 2, sw, stroke)
            context.rotate(Math.PI / seg)
        }

        context.restore()
    }

    drawTriangle(context, scale) {
        const height = scale * (Math.sqrt(3) / 2)

        context.beginPath()
        context.moveTo(0, -height / 2)
        context.lineTo(-scale / 2, height / 2)
        context.lineTo(scale / 2, height / 2)
        context.lineTo(0, -height / 2)
        context.fill()
        context.closePath()
    }
}

export default Context