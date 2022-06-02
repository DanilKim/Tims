const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGE_TITLE = 'Mint Studio';

module.exports = (self) => {
  const isProduction = true;
  const port = self.hasOwnProperty('port') ? self.port : 8080;

  const config = {
    mode: "production",
    context: path.resolve(__dirname),
    entry: {
      home: './public/src/home.js',
      shared: ['react', 'react-dom', 'mobx', 'mobx-react']
    },
    output: {
      path: path.resolve(__dirname, './public/dist'),
      filename: '[chunkhash].[name].js',
      clean: true
    },
    devtool: 'source-map',
    target: 'web',
    devServer: {
      static: path.resolve(__dirname, 'public'),
      port: port,
      open: true
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'mint-studio': path.join(__dirname, './src/export')
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
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
        template: './public/src/index.html',
        inject: 'body',
        production: isProduction
      }),
      new MiniCssExtractPlugin()
    ],
  }

  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    isProduction: JSON.stringify(isProduction)
  }));

  return config;
}
