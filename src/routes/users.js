import express from 'express';
import models from '../models';

const router = express.Router();
const { User } = models;

const errorBody = {
  status: 400,
  message: 'Something went wrong, try again',
};

router.get('/', (req, res) => {
  User.findAll({})
    .then(users => res.json(users))
    .catch(() => res.status(400).json(errorBody));
});

export default router;
