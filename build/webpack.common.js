const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const ROOT = path.resolve(__dirname, '../')

module.exports = {
    entry: {
        app: ['./resources/js/app.js', './resources/sass/app.sass']
    },
    plugins: [new ManifestPlugin({ writeToFileEmit: true }), new VueLoaderPlugin()],
    output: {
        path: path.resolve(ROOT, 'public/')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    enforce: true,
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    },
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                include: path.resolve(ROOT, 'resources/css'),
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'resolve-url-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                            publicPath: '/fonts'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        }
    }
}
