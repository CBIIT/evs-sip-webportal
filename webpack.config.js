const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    // hot: true
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
          { 
            loader: 'style-loader'
          },
          // { loader: 'css-loader' },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              // modules: true,
              // localIdentName: '[name]__[local]__[hash:base64:5]'
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [autoprefixer()]
            },
          },
        ]
      },

      // HTML
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false
          },
        }
      },
      
      //FONTS
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,  
        exclude: path.resolve(__dirname, '.src/img'),
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000, // in bytes
            fallback: 'file-loader',
            name: 'fonts/[name].[hash:8].[ext]'
          }
        }
      },

      //IMAGES
      {
        test: /\.(svg|gif|png|jpe?g)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000, // in bytes
            fallback: 'file-loader',
            name: 'img/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    })
  ]
} 