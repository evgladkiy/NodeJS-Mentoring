import express from 'express';

import { ProductModel } from '../models';
import { createNotFindByIdError, createDBError, addModifiedDateTo, createValidationModelError } from '../utils';

const router = express.Router();

router.get('/', (req, res, next) => {
  ProductModel.find({})
    .then(products => res.json(products))
    .catch(() => next(createDBError()));
});

router.post('/', (req, res, next) => {
  const { body: reqBody } = req;
  const newProduct = addModifiedDateTo({
    ...reqBody,
    reviews: reqBody.reviews || 0,
  });
  const createdProduct = new ProductModel(newProduct);
  const validationError = createdProduct.validateSync();

  if (validationError) {
    return next(createValidationModelError('product'));
  }
  return createdProduct
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
