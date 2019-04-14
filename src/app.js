import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import { initPassportLocal, initPassportGoogle, initPassportFacebook, initPassportTwitter } from './config';
import { createNotFoundError, createDefaultError } from './utils/errorCreators';
import { cookieParser, queryParser, tokenMiddleware } from './middlewares';

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
initPassportGoogle();
initPassportFacebook();
initPassportTwitter();

// delete token middleware for development
app.use('/', appRoute);
app.use('/auth/jwt', authJWTRoute);
app.use('/auth/passport', authPassportRoute);
app.use('/api/products', tokenMiddleware, productsRoute);
app.use('/api/users', tokenMiddleware, usersRoute);
app.use('/api/cities', tokenMiddleware, citiesRoute);

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
