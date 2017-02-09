const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const helpers = require('./helpers');

module.exports = {
  entry: {
    // defines our two bundle entry points named "polyfills" and "main"
    'polyfills': './src/polyfills.ts',
    'main': './src/main.ts'
  },
  resolve: {
    // sets precedence for extension resolution of modules references with no extension
    extensions: ['.js', '.ts', '.sass']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          // a loader to transpile our Typescript code to ES5, guided by the tsconfig.json file
          'awesome-typescript-loader',
          // Searches for templateUrl declarations inside of the Angular 2 Component metadata
          // and replaces the paths with the corresponding require statement.
          // The generated require statements will be handled by the html-loader.
          'angular2-template-loader'
        ]
      },

      // HTML Loader
      //
      // Responsible for loading HTML as string. Thus all instances of require('./path/to/html.html')
      // will be replaced with the corresponding HTML string within the bundle.
      // Note that by default every local <img src="image.png"> in our HTML is required (require('./image.png')),
      // which are in turn handled by the file loader.
      {
        test: /\.html$/,
        use: 'html-loader'
      },

      // File Loader
      //
      // All referenced binary files are copied to dist/assets
      // and their corresponding references are updated to reflect this new location.
      // Note there are alternate file loaders that can support inlining certain types
      // of files within our bundles.
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
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
        exclude: helpers.root('src/app'),
        // 1. sass - compiles Sass to CSS
        // 2. postcss - applies PostCSS plugins described below
        // 3. css - interprets @import and url(...) statements within our CSS like require()
        // 4. style - injects CSS into the DOM
        // 5. ExtractTextPlugin - groups all of the output of this loader into a standalone CSS bundle
        // loader: ExtractTextPlugin.extract('style', 'css!postcss!sass?sourceMap'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            'postcss-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src/app'),
        // this loader performs all of the operation of the previous loader with the
        // exception of the sass-loader
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            'postcss-loader'
          ]
        })
      },
      // Component Styles Loader
      //
      // The following two loaders handle import/require statements for .css/.sass/.scss files
      // that reside within src/app.  Use the following syntax to import Component styles:
      // @Component({
      //   styles: [require('./path/to/file').toString()]
      // })
      //
      // Note that this is a work-around. Using angular2-template-loader we are supposed to
      // be able to write:
      // @Component({
      //   styleUrls: './path/to/file'
      // })
      // However, this only works with the raw-loader which prevents resolution of url(...) statements
      {
        test: /\.(sass|scss)$/,
        include: helpers.root('src/app'),
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }, {
        test: /\.css$/,
        include: helpers.root('src/app'),
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
          'postcss-loader'
        ]
      },

      {
        test: /\.md$/,
        use: [
          'html-loader',
          'markdown-loader'
        ]
      }
    ]
  },
  plugins: [
    // The CommonsChunkPlugin establishes a hierarchy between the chunks which determines how
    // dependencies are bundled. Specifically, common dependencies are included in the last
    // entry chunk that imports said dependency.
    // Note that normally every entry chunk has its own Webpack runtime. Only one such
    // chunk can be loaded per page. The CommonChunkPlugin allows us to load multiple entry chunks
    // by sharing a single runtime.
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'polyfills']
    }),
    // The HtmlWebpackPlugin generates an index.html file based on our index.ejs template.
    // It will automatically inject the <script> and <link> references to the
    // JavaScript and CSS files generated in the Webpack output.
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    })
  ]
};
