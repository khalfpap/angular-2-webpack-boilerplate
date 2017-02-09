const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  // defines how the bundles are outputted
  output: {
    // output directory
    path: helpers.root('dist'),
    // the base URL from which the output files will be served
    publicPath: '/',
    // defines the name of an entry point bundle file
    // "name" refers to the entry point name
    // "hash" is a cache-busting hash
    filename: '[name].[hash].js',
    // defines the name of non-entry point chunks
    chunkFilename: '[name].[hash].chunk.js'
  },
  plugins: [
    // terminates build if an error occurs
    new webpack.NoEmitOnErrorsPlugin(),
    // minify js
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true
    }),
    // extracts embedded CSS as external files, adding cache-busting hash to the filename
    new ExtractTextPlugin({
      filename: '[name].[hash].css'
    }),
    // use to define environment variables that we can reference within our application
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
