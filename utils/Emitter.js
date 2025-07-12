class Emitter {
    constructor() {
        this._events = new Map()
    }

    has(eventName) {
        return this._events.has(eventName)
    }

    on(eventName, listener) {
        const listeners = this._events.get(eventName)

        if (!listeners) {
            this._events.set(eventName, [ listener ])

            return
        }

        listeners.push(listener)
    }

    emit(eventName, ...args) {
        if (!this._events.has(eventName)) return

        this._events.get(eventName).forEach((listener) => {
            listener(...args)
        })
    }
}

export default Emitter