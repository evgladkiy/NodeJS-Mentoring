import express from 'express';

import models from '../models';

const router = express.Router();
const { Product } = models;

router.get('/', (req, res, next) => {
  Product.findAll({})
    .then(products => res.json(products))
    .catch(() => next());
});

router.post('/', (req, res, next) => {
  const newProduct = {
    color: req.body.color || null,
    isFavorite: req.body.isFavorite || false,
    name: req.body.name || null,
    reviews: req.body.reviews || 0,
  };

  Product.create(newProduct)
    .then(product => res.json(product))
    .catch(() => next());
});

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).send({
          status: 404,
          message: `Cannot find product with id: ${req.params.id}`,
        });
      }
    })
    .catch(() => next());
});

router.get('/:id/reviews', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => {
      if (product) {
        res.json({ reviews: product.reviews });
      } else {
        res.status(404).send({
          status: 404,
          message: `Cannot find product with id: ${req.params.id}`,
        });
      }
    })
    .catch(() => next());
});

router.use('*', (req, res) => {
  res.status(400).json({
    status: 400,
    message: 'Something went wrong, try again',
  });
});

export default router;
