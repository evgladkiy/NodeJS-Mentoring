import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import initPassportLocal from './config/passport-local';
import initPassporGoogle from './config/passport-google';
import initPassporFacebook from './config/passport-facebook';

import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import tokenMiddleware from './middlewares/tokenMiddleware';

import appRoute from './routes/app';
import productsRoute from './routes/products';
import usersRoute from './routes/users';
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

app.use('/', appRoute);
app.use('/auth/jwt', authJWTRoute);
app.use('/auth/passport', authPassportRoute);
app.use('/api/products', tokenMiddleware, productsRoute);
app.use('/api/users', tokenMiddleware, usersRoute);

app.get('/*', (req, res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'error 404',
    message: 'Sorry, api doesn\'t support this route'
  }, null, 2));
});

export default app;
