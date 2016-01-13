var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var libraryName = 'filofax';
var plugins = [];

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({
    compress: {warnings: false}
  }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}
var config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};

module.exports = config;
