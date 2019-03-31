/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');

const SwaggerExpress = require('swagger-express-mw');
const path = require('path');

const app = require('./app').default;
const config = require('./../config/config').default;
const connectToDB = require('./mongoose/connectToDB').default;

const swaggerConfig = { appRoot: path.join(__dirname, './../') };
const { defaultPort } = config.app;
const port = process.env.PORT || defaultPort;
const helloMsg = `App started at port ${port}, open http://localhost:${port}/login`;

SwaggerExpress.create(swaggerConfig, (err, swagger) => {
  if (err) {
    throw err;
  }

  connectToDB
    .then(() => {
      swagger.register(app);
      app.listen(port, () => console.log(helloMsg));
    })
    .catch(err => console.log(err));
});
