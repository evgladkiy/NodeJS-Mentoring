import { UserModel } from '../../src/models';
import { createNotFindByIdError, createDBError } from '../../src/utils';

function getUsers(req, res, next) {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(() => next(createDBError()));
}

function deleteUser(req, res, next) {
  UserModel.findByIdAndDelete(req.params.id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        next(createNotFindByIdError('user', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
}

export { deleteUser, getUsers };
