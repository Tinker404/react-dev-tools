var webpack = require('webpack');
var path = require('path');
var TARGET = process.env.npm_lifecycle_event;

//webpack插件引入
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

//postcss插件引入
var autoprefixer = require('autoprefixer');
var calc = require("postcss-calc")
var discardComments = require('postcss-discard-comments')
var discardEmpty = require('postcss-discard-empty')

//postcss插件配置列表
var postCssConfig = function () {
    return [autoprefixer, calc, discardComments, discardEmpty];
}

//这里复制你的静态文件
var MoveFiles = new CopyWebpackPlugin([
    {from: './app/index.html', to: './'},
    {from: './app/img', to: './img'},
])

//电脑调试(速度更快)
if (TARGET == 'dev') {
    module.exports = {
        entry: [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            path.resolve(__dirname, 'app/app.js')
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: './app.js'
        },
        devtool: "eval",
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    //如不需要HMR功能请去除下方插件
                    query: {
                        plugins: [[
                            'react-transform', {
                                transforms: [{
                                    transform: 'react-transform-hmr',
                                    imports: ['react'],
                                    locals: ['module']
                                }]
                            }]
                        ]
                    }
                }, {
                    test: /\.less$/,
                    loader: 'style!css!postcss-loader!less'
                }, {
                    test: /\.scss$/,
                    loader: 'style!css!postcss-loader!sass'
                }, {
                    test: /\.css/,
                    loader: 'style!postcss-loader!css'
                }, {
                    test: /\.(png|jpg)$/,
                    loader: 'url?limit=6000'
                }, {
                    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                    loader: 'url?prefix=font/&limit=10000'
                }
            ],
        },
        postcss: postCssConfig
    };
}

//browersync手机调试
if (TARGET == 'phone') {
    module.exports = {
        entry: [
            path.resolve(__dirname, 'app/app.js')
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: './app.js'
        },
        devtool: "eval",
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                }, {
                    test: /\.less$/,
                    loader: 'style!css!postcss-loader!less'
                }, {
                    test: /\.scss$/,
                    loader: 'style!css!postcss-loader!sass'
                }, {
                    test: /\.css/,
                    loader: 'style!postcss-loader!css'
                }, {
                    test: /\.(png|jpg)$/,
                    loader: 'url?limit=6000'
                }, {
                    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                    loader: 'url?prefix=font/&limit=10000'
                }
            ]
        },
        plugins: [
            new BrowserSyncPlugin({
                    host: 'localhost',
                    port: 3000,
                    server: {baseDir: ['./dist']},
                }
            ),
            MoveFiles
        ],
        postcss: postCssConfig
    };
}

//打包生产环境文件
if (TARGET == "build") {
    module.exports = {
        entry: [
            path.resolve(__dirname, 'app/app.js')
        ],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: './app.js',
        },
        //如有source-map需求,请激活下面一行代码
        // devtool: "source-map",
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                }, {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!less')
                }, {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('style', 'css!postcss-loader!sass')
                }, {
                    test: /\.css/,
                    loader: ExtractTextPlugin.extract('style', 'postcss-loader!css')
                }, {
                    test: /\.(png|jpg)$/,
                    loader: 'url?limit=6000'
                }, {
                    test: /\.woff|\.woff2|\.svg|.eot|\.ttf/,
                    loader: 'url?prefix=font/&limit=10000'
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin("app.css"),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    warnings: false
                }
            }),

            new webpack.DefinePlugin({
                'process.env': {NODE_ENV: JSON.stringify("production")},
                '__DEV__': false
            }),

            MoveFiles
        ],
        postcss: postCssConfig
    };
}
