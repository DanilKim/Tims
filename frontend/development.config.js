const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGE_TITLE = 'Tims';

const proxy_server = {
  '/api': {
    target: "http://192.168.153.221:8080",
    changeOrigin: true, 
    pathRewrite: {'/api': '/'},
  }
}

module.exports = (self) => {
  const isProduction = false;
  const port = self.hasOwnProperty('port') ? self.port : 8080;

  const config = {
    mode: "development",
    context: path.resolve(__dirname, 'public'),
    entry: {
      home: './src/Home.js',
      shared: ['react', 'react-dom', 'mobx', 'mobx-react']
    },
    output: {
      path: path.join(__dirname, './public/dist'),
      filename: '[chunkhash].[name].js',
      clean: true
    },
    devtool: 'eval',
    target: 'web',
    devServer: {
      static: path.resolve(__dirname, 'public'),
      port: port,
      open: true,
      historyApiFallback: true,
      proxy: proxy_server,
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
