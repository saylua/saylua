const Koa = require("koa");
const serve = require("koa-static");
const koaWebpack = require("koa-webpack");
const webpackConfig = require("./webpack.config.js");

const serverWrapper = async () => {
  const app = new Koa();

  const middleware = await koaWebpack({ config: webpackConfig });
  app.use(middleware);

  app.use(serve(`${__dirname}/www`));

  const server = app.listen(3000, () => {
    const host = server.address().address;
    const { port } = server.address();
    console.log("Example app listening at http://%s:%s", host, port);
  });
};

serverWrapper();
