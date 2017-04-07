// const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'public')
const APP_DIR = path.resolve(__dirname, 'src')
const WEBPACK_PORT = 3000

const config = {
  entry: path.resolve(APP_DIR, 'index.js'),
  output: {
    path: BUILD_DIR,
    publicPath: '/public',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
  ],

  devServer: {
    contentBase: './',
    inline: true,
    port: WEBPACK_PORT,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
      },
    },
  },

}

module.exports = config
