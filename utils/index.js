import * as MathUtils from "./math/index.js"
import * as ObjectUtils from "./object/index.js"
import * as ArrayUtils from "./array/index.js"
import * as StringUtils from "./string/index.js"
import * as GraphicsUtils from "./2d/index.js"
import Emitter from "./Emitter.js"

const utils = Object.assign({
    Emitter,
    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}, 
    MathUtils, ObjectUtils,
    ArrayUtils, StringUtils,
    GraphicsUtils
)

export default utils