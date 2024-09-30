// webpack.config.js
var webpack = require('webpack');
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main:'./src/index.js'
  },
  output: {
    filename: 'build.js',
    path: path.resolve('public'),
    library:'workboxes-test',
    libraryTarget:'umd',
    clean:true,
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },  
  },
  resolve: {
    extensions: ['.js'],
    modules: ['./src', 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};