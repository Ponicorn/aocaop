const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'public/js')
const APP_DIR = path.resolve(__dirname, 'src')
const WEBPACK_PORT = 3000

const config = {
  entry: path.resolve(APP_DIR, 'index.js'),
  output: {
    path: BUILD_DIR,
    publicPath: '/js/',
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],

      },
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
      },
    ],
  },

  devServer: {
    contentBase: './public/',
    inline: true,
    port: WEBPACK_PORT,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
      },
    },
  },

}

// config.plugins = (config.plugins || []).concat([
//   new webpack.optimize.UglifyJsPlugin({
//     sourceMap: true,
//     compress: { warnings: false },
//   }),
//   new webpack.LoaderOptionsPlugin({ minimize: true }),
// ])

module.exports = config
