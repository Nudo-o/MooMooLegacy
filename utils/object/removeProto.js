function removeProto(object) {
    if (!(object instanceof Object)) return object

    return JSON.parse(JSON.stringify(object))
}

export default removeProto