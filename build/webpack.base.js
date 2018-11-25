'use strict';
var path = require('path');
var webpack = require('webpack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = [{
  name: "library",
  mode: "none",
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: path.resolve('./src/index.ts'),
  output: {
    path: path.resolve('./dist/web'),
    filename: 'buttplug.js',
    libraryTarget: 'umd',
    library: {
      root: "Buttplug",
      amd: "buttplug-amd",
      commonjs: "buttplug-commonjs"
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|tests|example/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ],
  node: {
    fs: 'empty'
  }
}, {
  name: "devtools",
  mode: "none",
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: path.resolve('./src/devtools/web/index.web.ts'),
  output: {
    path: path.resolve('./dist/web'),
    filename: 'buttplug-devtools.js',
    libraryTarget: 'umd',
    library: {
      root: "ButtplugDevTools",
      amd: "buttplug-devtools-amd",
      commonjs: "buttplug-devtools-commonjs"
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|tests|example/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader'
        }]
      }
    ]
  },
  externals: [
    function(context, request, callback) {
      // This will catch both the imports from the devtools and devtools/web
      // directories. And will probably cause some weird bug at some point.
      // Future me, you are totally allowed to hate now me for this.
      if (/..\/index$/.test(request)) {
        // If a module in the devtools has been included from the core module,
        // replace it with a reference to the Buttplug global. This allows us to
        // exclude the library/dependencies and make the library smaller, since
        // it's considered a plugin anyways.
        return callback(null, 'root Buttplug');
      }
      return callback();
    }
  ],
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new ForkTsCheckerWebpackPlugin()
  ],
  node: {
    fs: 'empty'
  }
}];

