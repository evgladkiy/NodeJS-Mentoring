import express from 'express';
import bodyParser from 'body-parser';

import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import tokenMiddleware from './middlewares/tokenMiddleware';

import products from './routes/products';
import users from './routes/users';
import auth from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser);
app.use(queryParser);

app.use(tokenMiddleware);

app.use('/auth', auth);
app.use('/api/products', products);
app.use('/api/users', users);

app.get('/*', (req, res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'error 404',
    message: 'Sorry, api doesn\'t support this route'
  }, null, 2));
});

export default app;
