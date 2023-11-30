const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');



const cssLoaders = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
}
const babelloader =  {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
          presets: ['@babel/preset-env']
        }
  }
}
const entry_props = {};

entry_props.homepage = './public/src/js/homepage.js';



module.exports = {
  entry: entry_props, // Archivo principal de entrada
  output: {
    filename: '[name].bundle.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'public/dist/js/'), // Carpeta de salida
  },
  plugins: [],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true, // Esto evita que los comentarios se extraigan a archivos separados
      }),
    ],
  },
  devtool: 'source-map',
  module: {
    rules: [babelloader, cssLoaders],
  },
  resolve : {
    fallback: {
        "util": require.resolve("util/"),
        "stream" : require.resolve("stream-browserify"),
        "crypto" : require.resolve('crypto-browserify'),
        "assert" : require.resolve("assert/"),
        "zlib" : require.resolve("browserify-zlib"),
        "path": require.resolve("path-browserify"),
        "url" : require.resolve('url/'),
        "querystring": require.resolve('querystring-es3'),
        'https' : require.resolve("https-browserify"),
        "http" : require.resolve("stream-http"),
        "buffer": require.resolve("buffer/"),
        "os" : require.resolve("os-browserify/browser"),
        "fs" : false,
        "constants": require.resolve("constants-browserify"),

      }
  }
};
