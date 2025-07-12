class Manager extends Map {
    constructor() {
        super()
    }

    get list() {
        return [ ...this.values() ]
    }
    
    filter(predicate, index) {
        if (!(predicate instanceof Function)) return false

        const result = this.list.filter(predicate)

        return typeof index !== 'undefined' ? result[index] : result
    }

    sort(compare, index) {
        if (!(compare instanceof Function)) return false

        const result = this.list.sort(compare)

        return typeof index !== 'undefined' ? result[index] : result
    }

    each(callback) {
        if (!(callback instanceof Function)) return false

        this.forEach(callback)
    }
}

export default Manager