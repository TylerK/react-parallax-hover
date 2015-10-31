var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  externals: [
    {
      react: {
        root: 'React', amd: 'react', commonjs: 'react', commonjs2: 'react'
      }
    }
  ],
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  sassLoader: {
    includePaths: [path.resolve(__dirname, './src')]
  }
};
