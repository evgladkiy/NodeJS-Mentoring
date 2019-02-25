import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import Sequelize from 'sequelize';

import initPassportLocal from './config/passport-local';
import initPassporGoogle from './config/passport-google';
import initPassporFacebook from './config/passport-facebook';
import initPassporTwitter from './config/passport-twitter';
import sequelizeConfig from './config/seauelize';

import cookieParser from './middlewares/cookieParser';
import queryParser from './middlewares/queryParser';
import tokenMiddleware from './middlewares/tokenMiddleware';

import appRoute from './routes/app';
import productsRoute from './routes/products';
import usersRoute from './routes/users';
import authJWTRoute from './routes/auth-jwt';
import authPassportRoute from './routes/auth-passport';
import DBInit from './utils/DBInit';

const app = express();
const sequelize = new Sequelize(...sequelizeConfig);

sequelize
  .authenticate()
  .then(() => DBInit(sequelize))
  .catch(err => console.log(err));

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
