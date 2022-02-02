import Koa, { Context } from 'koa';

const app = new Koa();

app.use((ctx: Context) => {
  ctx.body = 'Hello World';
});

app.listen(8081);