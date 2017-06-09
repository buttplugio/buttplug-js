var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  devtool: 'source-map',
  entry: {
    "dist-bundle/bundle": "./dist/main/src/core/client.js",
    "dist-bundle/example/example": "./dist/main/example/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].js",
    libraryTarget: 'umd',
    library: 'Buttplug'
  },
  resolve: {
    extensions: [".js"]
  },
  plugins: [
	new HtmlWebpackPlugin({
      title: "example",
	  chunks: ["dist-bundle/example/example"],
      filename: "dist-bundle/example/example.html"
    })
  ]
};
