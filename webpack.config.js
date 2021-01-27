const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FirstWebpackPlugin = require('./plugins/first-webpack-plugin')
const SecondWebpackPlugin = require('./plugins/second-webpack-plugin')
const FileListPlugin = require('./plugins/file-list-plugin')
const WatchPlugin = require('./plugins/watch-plugin')
const DecideHtmlPlugin = require('./plugins/decide-html-plugin')
const CleanPlugin = require('./plugins/clean-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js',
    './src/style.css'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'custom-plugin'
    }),
    new CleanPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
    // new CleanWebpackPlugin(),
    // new FirstWebpackPlugin({
    //   msg: 'Hello World!'
    // }),
    // new SecondWebpackPlugin({
    //   msg: 'Hello'
    // }),
    // new FileListPlugin(),
    // new WatchPlugin(),
    // new DecideHtmlPlugin(),
  ]
}