function objectToArray(object) {
    if (object instanceof Map) return [ ...object.values() ]
    if (object instanceof Object) return [ ...Object.values(object) ]

    return object
}

export default objectToArray