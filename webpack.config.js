const resolve = require('path').resolve;
module.exports = {
  entry:  __dirname + '/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'objectTimeLine.min.js'
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  }
};