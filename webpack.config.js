const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

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
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};

// Server Webpack config
const serverConfig = {
  ...baseConfig,
  entry: ['./server/main.ts'],
  target: 'node',
  output: {
    path: __dirname,
    filename: 'server.min.js',
    // Prevent HMR-related file spam.
    // See: https://stackoverflow.com/a/49642379
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  plugins: [
    // Make source maps work in a server side environment.
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false })
  ],
  externals: [nodeExternals()],
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
    ...baseConfig.resolve,
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [],
};

module.exports = [serverConfig, clientConfig];
