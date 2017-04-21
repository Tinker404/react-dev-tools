const webpack = require('webpack');
const path = require('path');
const TARGET = process.env.npm_lifecycle_event;

//webpack插件引入
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ClaenWebpackPlugin = require('clean-webpack-plugin');

//postcss插件引入
const autoprefixer = require('autoprefixer');

//postcss插件配置列表
const postCssConfig = function () {
  return [autoprefixer];
}

//DEV
if (TARGET == 'dev') {
  module.exports = {
    entry: [
      // 'webpack/hot/dev-server',
      // 'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/app.js')
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: 'app.js'
    },
    devtool: "eval",
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }]
              }]]
            }
          }
        }, {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {loader: 'postcss-loader', options: {plugins: postCssConfig}},
            'less-loader'
          ]
        }, {
          test: /\.(styl|stylus)/,
          use: [
            'style-loader',
            'css-loader',
            {loader: 'postcss-loader', options: {plugins: postCssConfig}},
            'stylus-loader'
          ]
        }, {
          test: /\.css/,
          use: [
            'style-loader',
            'css-loader',
            {loader: 'postcss-loader', options: {plugins: postCssConfig}},
          ]
        }, {
          test: /\.(jpg|jpeg|png|gif|swf|woff|woff2|svg|eot|ttf)$/,
          use: "file-loader"
        }
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react'
      })
    ]
  };
}

// //打包生产环境文件
if (TARGET == "build") {
  module.exports = {
    entry: [path.resolve(__dirname, 'app/app.js')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      // publicPath:'/',
      filename: 'app-[hash].js'
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          use: {loader: 'babel-loader'}
        }, {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader', options: {minimize: true}},
              {loader: 'postcss-loader', options: {plugins: postCssConfig}},
              'less-loader'
            ]
          })
        }, {
          test: /\.(styl|stylus)/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader', options: {minimize: true}},
              {loader: 'postcss-loader', options: {plugins: postCssConfig}},
              'stylus-loader'
            ]
          })
        }, {
          test: /\.css/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader', options: {minimize: true}},
              {loader: 'postcss-loader', options: {plugins: postCssConfig}}
            ]
          })
        }, {
          test: /\.(jpg|jpeg|png|gif|swf|woff|woff2|svg|eot|ttf)$/,
          use: `file-loader?name=[name]-[hash].[ext]&publicPath=&outputPath=img/`
        }
      ],
    },
    plugins: [
      new ClaenWebpackPlugin(['dist'], {
        root: path.resolve(__dirname),
        verbose: true,
        dry: false,
      }),

      new ExtractTextPlugin({
        filename: 'app-[hash].css',
        allChunks: true
      }),

      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
        compress: {
          warnings: false,
          screw_ie8: true
        },
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        comments: false
      }),

      new webpack.ProvidePlugin({
        React: 'react'
      }),

      new webpack.DefinePlugin({
        'process.env': {NODE_ENV: JSON.stringify("production")},
        '__DEV__': false
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'app/index.html'),
        filename: 'index.html'
      }),
    ],
  };
}
