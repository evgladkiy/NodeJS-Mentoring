/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
require('@babel/register');

const http = require('http');
const fs = require('fs');
const through2 = require('through2');

const config = require('./../../config/config').default;

const { port } = config.servers.html;

http
  .createServer((req, res) => {
    const htmlFilePath = `${__dirname}/../../assets/index.html`;
    const headers = { 'Content-Type': 'text/html' };

    const template = fs.readFileSync(htmlFilePath, 'utf8');
    const replacedTemplate = updateTemplate(template);

    res.writeHead(200, headers);
    res.write(replacedTemplate);
    res.end();

    // taks g. Change ​readFileSync​ to be a readable stream and pipe it to response​​ stream.
    //
    // fs.createReadStream(htmlFilePath)
    //   .pipe(through2(function(chunk) {
    //     const template = chunk.toString();
    //     this.push(updateTemplate(template));
    //   }))
    //   .pipe(res)
    //   .on('end', () => {
    //     res.writeHead(200, headers);
    //     res.end();
    //   })
  })
  .listen(port, () => console.log(`HTML server started at port ${port}, open http://localhost:${port}/`));

function updateTemplate(template) {
  const msg = 'Hello world';
  const regexpToReplace = new RegExp('{message}', 'g');

  return template.replace(regexpToReplace, msg);
}
