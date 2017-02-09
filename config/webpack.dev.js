const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  // defines how the bundles are outputted
  // when used in conjunction of the devServer a dist folder
  // will not be generated but will remain in memory
  output: {
    publicPath: 'http://localhost:8080/',
    // defines the name of an entry point bundle file
    // "name" refers to the entry point name
    filename: '[name].js',
    // defines the name of non-entry point chunks
    chunkFilename: '[name].chunk.js'
  },
  plugins: [
    // extracts embedded CSS as external files
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ],
  // configure the Webpack dev server
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
