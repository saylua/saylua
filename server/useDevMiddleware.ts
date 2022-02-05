import express from 'express';

import webpack, {Configuration} from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const webpackConfig: Configuration = require('../webpack.config.js');

export function useDevMiddleware(app: express.Application) {
  const compiler = webpack(webpackConfig);
  
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig?.output?.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));

  return app;
}