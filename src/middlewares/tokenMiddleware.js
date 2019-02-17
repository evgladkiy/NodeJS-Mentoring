import jwt from 'jsonwebtoken';

import config from '../config/config';

const routesToCheck = ['/api/users', '/api/products'];

const jsonHeaders = { 'Content-Type': 'application/json' };
const authError = JSON.stringify({
  code: 401,
  status: 'Unauthorized',
  message: `Unauthorized, Access denied`,
}, null, 2);

export default function tokenMiddleware(req, res, next) {
  const { url } = req;

  if (!routesToCheck.some(route => url.startsWith(route))) {
    next();
    return;
  }

  const token = req.headers[config.jwt.tokenHeaders];

  if (token) {
    jwt.verify(token, config.jwt.secret, (err, jwtUser) => {
      if (!err && jwtUser) {
        next();
      } else {
        res.writeHead(401, jsonHeaders);
        res.end(authError);
      }
    });
  } else {
    res.writeHead(401, jsonHeaders);
    res.end(authError);
  }
}
