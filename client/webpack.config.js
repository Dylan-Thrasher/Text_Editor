const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name]bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // configured workbox plugins for a service worker and manifest file
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text_Editor'
      }),
      new WebpackPwaManifest({
        inject: true,
        fingerprints: false,
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'Takes notes with JavaScript syntax highlighting!',
        start_url: '/',
        publicPath: '/',
        theme_color: '#225ca3',
        background_color: '#225ca3',
        orientation: 'portrait',
        display: 'standalone',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons')
        }]
      }),
      // Injects custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      })
      
    ],
  //Added CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            }
          }
        }
      ],
    },
  };
};
