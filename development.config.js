const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGE_TITLE = 'Tims';

module.exports = (self) => {
  const isProduction = false;
  const port = self.hasOwnProperty('port') ? self.port : 8080;
  if (isProduction) console.info('Webpack: Production mode'); else console.info('Webpack: Development mode');

  const config = {
    mode: "development",
    context: path.resolve(__dirname, 'public'),
    entry: {
      home: './src/home.js',
      shared: ['react', 'react-dom', 'mobx', 'mobx-react']
    },
    output: {
      path: path.join(__dirname, './public/dist'),
      filename: '[chunkhash].[name].js',
      clean: true
    },
    devtool: isProduction ? 'source-map' : 'eval',
    target: 'web',
    devServer: {
      static: path.resolve(__dirname, 'public'),
      port: port,
      open: true
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        'tims': path.join(__dirname, './src/export')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|pages)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: { import: true }
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          type: 'asset/resources',
          generator: {
            filename: 'images/[hash][ext]'
          }
        }
      ]
    },
    optimization: {
      minimize: isProduction,
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new HtmlWebPackPlugin({
        title: PAGE_TITLE,
        template: './src/index.html',
        inject: 'body',
        production: isProduction
      }),
      new MiniCssExtractPlugin()
    ],
  }

  config.plugins.push(new webpack.DefinePlugin({
    isProduction: JSON.stringify(isProduction)
  }));

  return config;
}
