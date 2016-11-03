'use strict';
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: 'bundle.js',
    publicPath: "/assets",
  },
  //To run development server
  devServer: {
    contentBase: __dirname + "/src",
  },
};