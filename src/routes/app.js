import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/auth-success.html'));
});

router.get('/error', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/auth-error.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/login.html'));
});

export default router;
