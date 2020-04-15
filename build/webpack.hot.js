const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')

const devConfig = require('./webpack.dev')

const isDocker = process.env.DOCKERIZED || false

const CERT_FOLDER = path.resolve(process.env.HOME, 'Dev/Certs')
let https = false
if (fs.existsSync(CERT_FOLDER)) {
    const https = {
        key: fs.readFileSync(path.resolve(CERT_FOLDER, 'server.key')),
        cert: fs.readFileSync(path.resolve(CERT_FOLDER, 'server.crt')),
        ca: fs.readFileSync(path.resolve(CERT_FOLDER, 'rootCA.pem'))
    }
}

const DEV_HOST = process.env.DEV_HOST || 'localhost'
const DEV_PORT = process.env.DEV_PORT || 8080
const DEV_URL = `http${https ? 's' : ''}://${DEV_HOST}:${DEV_PORT}/`
const PROXY_URL = process.env.PROXY_URL || 'http://localhost'

// Create file to notify backend that hot reloading enabled
;(function createHotReloadingFlag (url, hotFile) {
    const manifestPath = path.join(__dirname, '../public/manifest.json')
    const oldManifest = fs.readFileSync(manifestPath)
    fs.writeFile(hotFile, url, err => {
        if (err) return console.error(`Can't write file for hot reloading!`)
        console.log(`Hot reloading enabled on backend on ${DEV_URL}!`)
    })
    process.on('exit', code => {
        fs.unlinkSync(hotFile)
        fs.writeFileSync(manifestPath, oldManifest);
        console.log('Hot reloading disabled on backend!')
    })
})(DEV_URL, path.join(__dirname, '../public/hot'))

module.exports = merge(devConfig, {
    output: {
        publicPath: '/'
    },
    devServer: {
        allowedHosts: ['localhost', '.localhost'],
        contentBase: path.join(__dirname, 'public'),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/': PROXY_URL
        },
        overlay: true,
        noInfo: true,
        port: DEV_PORT,
        host: isDocker ? '0.0.0.0' : DEV_HOST,
        https: https
    }
})
