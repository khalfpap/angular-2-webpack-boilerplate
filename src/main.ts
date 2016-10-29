// this file contains code to load and bootstrap our app
// a spinner is displayed in the meanwhile
require('./styles/spinner.sass');

// here we create a dynamic chunk corresponding to the main app
// which will be loaded asynchronously
require.ensure(['./app'], (require) => {
  require('./app').bootstrap();
});
