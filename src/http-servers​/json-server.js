require('@babel/register');

const http = require('http');
const fs = require('fs');

const config = require('./../../config/config').default;

const { port } = config.servers.json;

http
  .createServer((req, res) => {
    const productFilePath = `${__dirname}/../../assets/product.json`;
    const headers = { 'Content-Type': 'application/json' };

    res.writeHead(200, headers);
    fs.createReadStream(productFilePath)
      .pipe(res)
      .on('end', res.end);
  })
  .listen(8000, () => console.log(`JSON server started at port ${port}, open http://localhost:${port}/`));
