'use strict';
var path = require('path');
var webpack = require('webpack');
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = [{
  name: "library",
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
    filename: 'buttplug',
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
    new ForkTsCheckerWebpackPlugin(),
  ],
  node: {
    fs: 'empty'
  }
}, {
  name: "devtools",
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
  entry: './src/devtools/web/index.web.ts',
  output: {
    path: path.resolve(__dirname, './dist/web'),
    filename: 'buttplug-devtools',
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
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2|ttf)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
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

if (process.env.NODE_ENV === 'production') {
  for (const m of module.exports) {
    m.devtool = '#source-map';
    m.output.filename = `${m.output.filename}.min.js`;
    // http://vue-loader.vuejs.org/en/workflow/production.html
    m.plugins = (module.exports.plugins || []).concat([
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
} else {
  for (const m of module.exports) {
    m.output.filename = `${m.output.filename}.js`;
  }
}
