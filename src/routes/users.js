import express from 'express';
import fs from 'fs';

const usersPath = `${__dirname}/../../assets/users.json`;

const router = express.Router();
const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const jsonHeaders = { 'Content-Type': 'application/json' };

router.get('/', (req, res) => {
  res.writeHead(200, jsonHeaders);
  res.end(JSON.stringify(users, null, 2));
});

export default router;
