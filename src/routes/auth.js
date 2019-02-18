import express from 'express';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import config from '../config/config';

const usersPath = `${__dirname}/../../assets/users.json`;
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

const router = express.Router();

router.post('/', (req, res) => {
  const { login, password } = req.body;
  const storedUser = users.find(user => user.email === login);

  if (storedUser) {
    if (storedUser.password === password) {
      res.json({
        code: 200,
        status: 'OK',
        data: {
          user: {
            email: storedUser.email,
            username: storedUser.name,
          },
        },
        token: jwt.sign(storedUser, config.jwt.secret),
      });
    } else {
      res.json({
        code: 404,
        status: 'Not Found',
        message: 'Incorrect password, try again',
      });
    }
  } else {
    res.json({
      code: 404,
      status: 'Not Found',
      message: `Cannot find user ${login}`,
    });
  }
});

router.post(
  '/passport',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/error',
  })
);

export default router;
