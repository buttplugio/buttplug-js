'use strict';
const merge = require('webpack-merge');
const production = require('./webpack.production.js');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}

module.exports = merge.multiple(production, [
  {
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  },
  {
  }]);

