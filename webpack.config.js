var path = require("path");

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
  entry: ["./src/core/client.ts"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    libraryTarget: 'umd',
    library: 'Buttplug'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};
