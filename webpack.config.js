const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      // JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      // CSS
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },

      // HTML
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },

      {
        test: /\.(svg|gif|jpg|png|eot|woff|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192 // in bytes
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      // inject: true,
      // //chunks: ['index'],
      // filename: 'index.html'
    })
  ]
} 