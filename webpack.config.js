'use strict';
var path = require('path');
var webpack = require('webpack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // Needed so tsconfig can be found
  context: __dirname,
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist/web'),
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
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
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
    // We use text-encoding as a polyfill for node, but when packing for the
    // web, we can assume the browser will have it. Ignore it here and save
    // ourselves 600k of library!
    new webpack.IgnorePlugin(/text-encoding/),
    new ForkTsCheckerWebpackPlugin(),
  ],
  node: {
    fs: 'empty'
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.output.filename = 'buttplug.min.js';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          keep_classnames: true,
          keep_fnames: true
        },
        compress: {
          keep_fnames: true,
          warnings: false
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
