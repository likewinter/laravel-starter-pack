const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const commonConfig = require('./webpack.common')

module.exports = merge.smart({
    mode: 'production',
    output: {
        filename: 'js/[name].[hash].js',
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!*'],
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [{ loader: MiniCssExtractPlugin.loader }]
        }, {
            test: /\.s[ac]ss$/i,
            use: [{ loader: MiniCssExtractPlugin.loader }]
        }]
    }
}, commonConfig)
