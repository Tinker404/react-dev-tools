var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var TARGET = process.env.npm_lifecycle_event;

//这里复制你的静态文件
var MoveFiles = new CopyWebpackPlugin([
    {from: './app/index.html', to: './'},
    {from: './app/img', to: './img'}
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
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                }, {
                    test: /\.less$/,
                    loader: 'style!css!autoprefixer!less'
                }, {
                    test: /\.css/,
                    loader: 'style!css'
                }, {
                    test: /\.(png|jpg)$/,
                    loader: 'url?limit=6000'
                }
            ]
        },
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
        devtool: "source-map",
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    exclude: /node_modules/,
                    loader: 'babel'
                }, {
                    test: /\.less$/,
                    loader: 'style!css!autoprefixer!less'
                }, {
                    test: /\.css/,
                    loader: 'style!css'
                }, {
                    test: /\.(png|jpg)$/,
                    loader: 'url?limit=6000'
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
        ]
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
                    loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less')
                }, {
                    test: /\.css/,
                    loader: ExtractTextPlugin.extract('style', 'css')
                }, {
                    test: /\.(png|jpg)$/,
                    loader: 'url?limit=6000'
                }, {
                    test: /\.(woff|ttf|svg|eot)$/,
                    loader: 'url?limit=10000'
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
        ]
    };


}