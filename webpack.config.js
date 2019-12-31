const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: slsw.lib.entries,
  // entry: './src/handler.js',
  target: 'node',
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  // externals: [nodeExternals()],
  externals: [nodeExternals({
    modulesFromFile: true
  })],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false,
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'test/**/*',
        to: '.'
      },
      {
        from: 'reporters/**/*',
        to: '.'
      },
      {
        from: 'configs/wdio.conf.js',
        to: 'configs/wdio.conf.js'
      },
      {
        from: 'configs/chrome.wdio.conf.js',
        to: 'configs/chrome.wdio.conf.js'
      },
      {
        from: 'configs/gecko.wdio.conf.js',
        to: 'configs/gecko.wdio.conf.js'
      }
    ]),
  ],
};