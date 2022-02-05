import express from 'express';
import {useDevMiddleware} from './useDevMiddleware';

const app = express();

app.use(express.static(__dirname + '/client/public'));

const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
  useDevMiddleware(app);
}

app.listen(80);
