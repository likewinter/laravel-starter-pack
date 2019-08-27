const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')

const devConfig = require('./webpack.dev')

const DEV_HOST = 'localhost'
const DEV_PORT = 8080
const DEV_URL = `https://${DEV_HOST}:${DEV_PORT}/`
const CERT_FOLDER = path.resolve(process.env.HOME, 'Dev/Certs')

// Create file to notify backend that hot reloading enabled
;(function createHotReloadingFlag (url, hotFile) {
    fs.writeFile(hotFile, url, (err) => {
        if (err) return console.error(`Can't write file for hot reloading!`)
        console.log('Hot reloading enabled on backend!')
    })
    process.on('exit', code => {
        fs.unlinkSync(hotFile)
        console.log('Hot reloading disabled on backend!')
    })
})(DEV_URL, path.join(__dirname, 'public/hot'))

module.exports = merge(devConfig, {
    output: {
        publicPath: DEV_URL
    },
    devServer: {
        allowedHosts: ['.localhost'],
        contentBase: path.join(__dirname, 'public'),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        overlay: true,
        noInfo: true,
        port: DEV_PORT,
        host: DEV_HOST,
        https: {
            key: fs.readFileSync(path.resolve(CERT_FOLDER, 'server.key')),
            cert: fs.readFileSync(path.resolve(CERT_FOLDER, 'server.crt')),
            ca: fs.readFileSync(path.resolve(CERT_FOLDER, 'rootCA.pem'))
        }
    }
})
