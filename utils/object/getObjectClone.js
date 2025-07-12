function getObjectClone(object) {
    if (!(object instanceof Object)) return object

    const clone = {}

    for (const key in object) {
        if (Array.isArray(object[key])) {
            clone[key] = object[key].slice(0)

            continue
        }

        clone[key] = object[key]
    }

    return clone
}

export default getObjectClone