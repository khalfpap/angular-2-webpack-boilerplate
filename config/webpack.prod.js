var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  // output bundles to dist
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    // bundles with cache-busting hash
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  plugins: [
    // terminates build if an error occurs
    new webpack.NoErrorsPlugin(),
    // removes identical and nearly identical files and removes from output
    new webpack.optimize.DedupePlugin(),
    // minify js
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    }),
    // extracts embedded CSS as external files, adding cache-busting hash to the filename
    new ExtractTextPlugin('[name].[hash].css'),
    // use to define environment variables that we can reference within our application
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
