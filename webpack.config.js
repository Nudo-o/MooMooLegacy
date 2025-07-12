import path from "path"
import { fileURLToPath } from "url"
import TerserWebpackPlugin  from "terser-webpack-plugin"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
    mode: "development",
    devtool: "source-map",
    target: [ "web", "es5" ],
    entry: "./public/frontend/index.js",
    output: {
        filename: "moomoo_io_legacy.js",
        path: path.resolve(__dirname, "public", "dist/js"),
        clean: true
    },
    devServer: {
        port: 4000,
        open: true,
        hot: true,
        watchFiles: [ "public/*.*", "server/*.*" ]
    },
    optimization: {
        minimizer: [ new TerserWebpackPlugin() ]
    },
    module: {
        rules: [{
            test: /\.json$/,
            type: "json"
        }]
    }
}