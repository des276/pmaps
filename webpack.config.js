const path = require('path');

module.exports = {
  entry: './public/javascripts/src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};