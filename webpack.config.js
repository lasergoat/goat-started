var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,

  entry: './public/index.js',

  output: {
      path: path.resolve('./build/'),
      filename: "[name]-[hash].js",
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
    new HtmlWebpackPlugin({
      title: '',
      template: path.join(__dirname, 'public/index.html'),
      inject: 'body'
    })
  ],

  module: {
    loaders: [
      {
        // to transform JSX into JS
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.json/,
        loaders: ['json-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'css!' +
          'postcss!' +
          'sass?sourceMap'
        )
      }
    ],
  },

  postcss: function() {
    return [
      autoprefixer({
        browsers: ['ios >= 7']
      })
    ];
  },

  devtool: 'inline-source-map',

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  watchOptions: {
    poll: true,
    polling: 1000
  }
}
