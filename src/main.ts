// this file contains code to load and bootstrap our app
// a spinner is displayed in the meanwhile
require('./styles/spinner.sass');

// here we create a chunk named "app" containing all our Angular 2 app code
// this chunk will be loaded asynchronously
require.ensure(['./app'], (require) => {
  require('./app').bootstrap(); // bootstrap our app
}, 'app');
