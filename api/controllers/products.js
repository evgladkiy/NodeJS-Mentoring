import { ProductModel } from '../../src/models';
import { createNotFindByIdError, createDBError, addModifiedDateTo, createValidationModelError } from '../../src/utils';

function getProducts(req, res, next) {
  ProductModel.find({})
    .then(products => res.json(products))
    .catch(() => next(createDBError()));
}

function postProduct(req, res, next) {
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
}

function getProductById(req, res, next) {
  ProductModel.findById(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        next(createNotFindByIdError('product', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
}

function getProductReviews(req, res, next) {
  ProductModel.findById(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        next(createNotFindByIdError('product', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
}

function deleteProduct(req, res, next) {
  ProductModel.findByIdAndDelete(req.params.id)
    .then(product => {
      if (product) {
        res.json(product);
      } else {
        next(createNotFindByIdError('product', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
}

export { getProducts, postProduct, getProductById, getProductReviews, deleteProduct };
