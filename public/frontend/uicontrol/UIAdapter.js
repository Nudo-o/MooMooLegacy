import utils from "../../../utils/index.js"

class UIAdapter extends utils.Emitter {
    constructor() {
        super()
    }

    create$(node) {
        return Object.assign(node, {
            show() {
                this.classList.remove("hidden")
            },
            hide() {
                this.classList.add("hidden")
            },
            toggle() {
                this.classList.toggle("hidden")
            },
            hasClass(className) {
                return this.classList.contains("hidden")
            },
            select() {
                this.classList.add("selected")
            },
            unselect() {
                this.classList.remove("selected")
            },
            denied() {
                this.classList.add("denied")
            },
            undenied() {
                this.classList.remove("denied")
            },
            on(eventName, listener) {
                this.addEventListener(eventName, listener)
            },
            setFontSize(_fontSize) {
                this.style.fontSize = _fontSize
            },
            clearHtml() {
                this.innerHTML = ""
            },
            setHtml(_html) {
                this.innerHTML = _html
            },
            addHtml(_html) {
                this.innerHTML += _html
            },
            setWidth(_width) {
                this.style.width = _width
            },
            setHeight(_height) {
                this.style.height = _height
            },
            setValue(_value) {
                this.value = _value
            },
            getValue() {
                return this.value
            },
            doFocus() {
                this.focus()
            }
        })
    }

    get$(selector, from) {
        if (typeof from === 'undefined') {
            from = document
        }

        const node = from.querySelector(selector)

        if (!node) return null

        return this.create$(node)
    }

    getAll$(selector, from) {
        if (typeof from === 'undefined') {
            from = document
        }

        if (!from) return null

        const nodes = [ ...from.querySelectorAll(selector) ]

        if (!nodes.length) return []

        return [ ...nodes.map((node) => this.create$(node)) ]
    }
}

export default UIAdapter