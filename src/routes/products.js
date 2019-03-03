import express from 'express';

import ProductModel from '../models/product';
import { createNotFindByIdError, createDBError } from '../utils/errorCreators';

const router = express.Router();

router.get('/', (req, res, next) => {
  ProductModel.find({})
    .then(products => res.json(products))
    .catch(() => next(createDBError()));
});

router.post('/', (req, res, next) => {
  const { body: reqBody } = req;
  const newProduct = {
    ...reqBody,
    reviews: reqBody.reviews || 0,
  };

  new ProductModel(newProduct)
    .save()
    .then(product => res.json(product))
    .catch(() => next(createDBError()));
});

router.get('/:id', (req, res, next) => {
  ProductModel.findById(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        next(createNotFindByIdError('product', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
});

router.delete('/:id', (req, res, next) => {
  ProductModel.findByIdAndDelete(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        next(createNotFindByIdError('product', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
});

router.get('/:id/reviews', (req, res, next) => {
  ProductModel.findById(req.params.id)
    .then(product => {
      if (product) {
        res.json({ reviews: product.reviews });
      } else {
        next(createNotFindByIdError('product', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
});

export default router;
