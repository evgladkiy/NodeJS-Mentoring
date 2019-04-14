import express from 'express';

import { UserModel } from '../models';
import { createNotFindByIdError, createDBError } from '../utils';

const router = express.Router();

router.get('/', (req, res, next) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(() => next());
});

router.delete('/:id', (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        next(createNotFindByIdError('user', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
});

export default router;
