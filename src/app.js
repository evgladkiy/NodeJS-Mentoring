import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import initPassportLocal from './config/passport-local';
import initPassporGoogle from './config/passport-google';
import initPassporFacebook from './config/passport-facebook';
import initPassporTwitter from './config/passport-twitter';

import { createNotFoundError, createDefaultError } from './utils/errorCreators';

import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import tokenMiddleware from './middlewares/tokenMiddleware';

import appRoute from './routes/app';
import productsRoute from './routes/products';
import usersRoute from './routes/users';
import citiesRoute from './routes/cities';
import authJWTRoute from './routes/auth-jwt';
import authPassportRoute from './routes/auth-passport';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser);
app.use(queryParser);

app.use(passport.initialize());
app.use(passport.session());

initPassportLocal();
initPassporGoogle();
initPassporFacebook();
initPassporTwitter();

app.use('/', appRoute);
app.use('/auth/jwt', authJWTRoute);
app.use('/auth/passport', authPassportRoute);
// app.use('/api/products', tokenMiddleware, productsRoute);
// app.use('/api/users', tokenMiddleware, usersRoute);
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/cities', citiesRoute);

app.get('*', (req, res, next) => next(createNotFoundError()));

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
  const defaultError = createDefaultError();
  const errorMsg = err.msg || defaultError.msg;
  const errorCode = err.code || defaultError.code;
  const msgBody = {
    status: errorCode,
    message: errorMsg,
  };

  res.writeHead(errorCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(msgBody, null, 2));
});

export default app;
