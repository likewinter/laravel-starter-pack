const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const commonConfig = require('./webpack.common')

const miniCssLoader = {
    loader: MiniCssExtractPlugin.loader,
    options: {
        hmr: true
    }
}

module.exports = merge.smart({
    mode: 'development',
    output: {
        filename: 'js/[name].js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [miniCssLoader]
        }, {
            test: /\.s[ac]ss$/i,
            use: [miniCssLoader],
        }]
    }
}, commonConfig)
