// this file contains polyfills that allows the Angular framework to work in older browsers

import 'core-js/es6';
import 'core-js/es7/reflect';
// it is important to load Zone.js early, immediately after the other ES6 and metadata shims
import 'zone.js/dist/zone';

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
