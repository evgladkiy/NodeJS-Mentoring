/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');

const app = require('./app').default;

const config = require('./../config/config').default;

const { defaultPort } = config.app;
const port = process.env.PORT || defaultPort;

app.listen(port, () => console.log(`App started at port ${port}, open http://localhost:${port}/`));
