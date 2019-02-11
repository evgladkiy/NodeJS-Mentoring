require('@babel/register');

const http = require('http');
const config = require('./../../config/config').default;

const { port } = config.servers.plainText;

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello world');
    res.end();
  })
  .listen(port, () => console.log(`Plain text server started at port ${port}, open http://localhost:${port}/`));
