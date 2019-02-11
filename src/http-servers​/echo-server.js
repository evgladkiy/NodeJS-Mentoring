require('@babel/register');

const http = require('http');

const config = require('./../../config/config').default;

const { port } = config.servers.echo;

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    req.pipe(res);
  })
  .listen(port, () => console.log(`Echo server started at port ${port}, open http://localhost:${port}/`));
