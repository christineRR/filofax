var path = require("path");
module.exports = {
  entry: {
    // app: ["./async-demo.js"]
    // app: ["./app.js"]
    app: ["./index.jsx"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/assets/",
    filename: "bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.json?$/,
        loader: "json-loader"
      }
    ]
  }
};
