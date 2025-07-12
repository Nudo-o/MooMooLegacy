function createHook({ property, proto = Object.prototype, setter, getter }) {
    const symbol = Symbol(property)

    Object.defineProperty(proto, property, {
        get() {
            typeof getter === 'function' && getter(this, this[symbol])

            return this[symbol]
        },
        set(value) {
            typeof setter === 'function' && setter(this, value)

            this[symbol] = value
        }
    })

    return symbol
}

export default createHook