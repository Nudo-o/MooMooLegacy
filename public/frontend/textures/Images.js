import images from "./images.json"

class Images extends Map {
    constructor() {
        super()
    }

    loadImage(key, path) {
        return new Promise((resolve) => {
            const fullPath = `./assets/${path}.png`
            const image = new Image()

            image.addEventListener("load", () => {
                image.isLoaded = true

                this.set(key, image)

                resolve()
            })

            image.src = fullPath
        })
    }

    loadAllImages() {
        return new Promise(async (resolve) => {
            const imagesEntries = Object.entries(images)

            for (let i = 0; i < imagesEntries.length; i++) {
                const image = imagesEntries[i]

                await this.loadImage(image[0], image[1])

                console.log("Image \"" + image[0] + "\" was loaded.")
            }

            resolve()
        })
    }
}

export default Images