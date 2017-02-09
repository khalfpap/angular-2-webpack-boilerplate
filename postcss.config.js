// Configures PostCSS for Webpack 2
// See https://www.npmjs.com/package/postcss-loader#usage
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: '>1%'
    })
  ]
};
