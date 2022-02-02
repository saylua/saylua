const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const isDevelopment = process.env.NODE_ENV !== 'production';

const clientBase = path.join(__dirname, 'client');

// Base Webpack config
const baseConfig = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};

// Server Webpack config
const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const serverConfig = {
  ...baseConfig,
  entry: './server/main.ts',
  target: 'node',
  output: {
    path: path.join(__dirname, 'server/build'),
    filename: 'backend.js',
  },
  plugins: [
    // Make source maps work in a server side environment.
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  externals: nodeModules,
}

// Client Webpack config
const clientConfig = {
  ...baseConfig,
  context: path.join(clientBase, 'src'),
  entry: ['./main.ts'],
  devServer: {
    client: {
      overlay: true,
    },
    static: {
      directory: path.join(clientBase, 'public'),
      serveIndex: true,
      watch: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
    hot: true,
  },
  output: {
    path: path.join(clientBase, 'public/build'),
    filename: 'bundle.min.js',
  },
  module: {
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [],
};

module.exports = [serverConfig, clientConfig];
