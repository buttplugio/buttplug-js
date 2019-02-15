'use strict';
const merge = require('webpack-merge');
const common = require('./webpack.base.js');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge.multiple(common, [
  {
    mode: "none",
    output: {
      filename: `buttplug.min.js`
    },
    optimization: {
      minimize: false
    },
    devtool: '#source-map',
    plugins: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,
        terserOptions: {
          mangle: {
            keep_classnames: true,
            keep_fnames: true
          },
          compress: {
            keep_fnames: true,
            keep_classnames: true,
          }
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ]
  },
  {
    mode: "none",
    output: {
      filename: `buttplug-devtools.min.js`
    },
    optimization: {
      minimize: false
    },
    devtool: '#source-map',
    plugins: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,
        terserOptions: {
          mangle: {
            keep_classnames: true,
            keep_fnames: true
          },
          compress: {
            keep_fnames: true,
            keep_classnames: true,
          }
        }
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    ]
  }]);

