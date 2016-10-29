var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var helpers = require('./helpers');

module.exports = {
  entry: {
    // defines our entry chunks
    'main': './src/main.ts'
  },
  resolve: {
    // sets precedence for extension resolution of modules references with no extension
    extensions: ['', '.js', '.ts', '.sass']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          // a loader to transpile our Typescript code to ES5, guided by the tsconfig.json file
          'awesome-typescript-loader'
        ]
      },

      // Common Styles Loader
      //
      // The following two loaders handle .css/.sass/.scss files outside of src/app.
      // Such files are included in our bundle via import/require statements in our TypeScript, e.g.:
      // import './path/to/file.css';
      // Normally the resulting CSS would be included in its corresponding bundle.  However,
      // the ExtractTextPlugin causes the results from each entry chunk to be output to its own
      // standalone CSS file.
      {
        test: /\.(sass|scss)$/,
        exclude: helpers.root('src', 'app'),
        // 1. sass - compiles Sass to CSS
        // 2. postcss - applies PostCSS plugins described below
        // 3. css - interprets @import and url(...) statements within our CSS like require()
        // 4. style - injects CSS into the DOM
        // 5. ExtractTextPlugin - groups all of the output of this loader into a standalone CSS bundle
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?sourceMap')
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        // this loader performs all of the operation of the previous loader with the
        // exception of the sass-loader
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      }
    ]
  },
  postcss: [
    autoprefixer({browsers: '>1%'})
  ],
  plugins: [
    // The HtmlWebpackPlugin generates an index.html file based on our index.ejs template.
    // It will automatically inject the <script> and <link> references to the
    // JavaScript and CSS files generated in the Webpack output.
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
  ]
};
