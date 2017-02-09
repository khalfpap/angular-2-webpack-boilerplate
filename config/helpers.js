const path = require('path');

const _root = path.resolve(__dirname, '..');

// get the absolute path relative to the root of the project
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

exports.root = root;
