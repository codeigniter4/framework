const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build/public/vgdt-admin'),
    filename: 'index.js',
    library: pkg.name,
    libraryTarget: 'umd'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /(node_modules|dist)/,
              loader: 'babel-loader'
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
          {
              test: /\.(jpe?g|png|gif|svg|ico)$/i,
              loader: "file-loader?name=./public/icons/[name].[ext]"
          }
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
