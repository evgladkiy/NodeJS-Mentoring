/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');

const app = require('./app').default;
const config = require('./../config/config').default;

const connectToDB = require('./mongoose/connectToDB').default;

const { defaultPort } = config.app;
const port = process.env.PORT || defaultPort;

connectToDB
  .then(() => app.listen(port, () => console.log(`App started at port ${port}, open http://localhost:${port}/login`)))
  .catch(err => console.log(err));
