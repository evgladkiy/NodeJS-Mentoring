import express from 'express';
import fs from 'fs';

const productsPath = `${__dirname}/../../assets/products.json`;

const router = express.Router();
const jsonHeaders = { 'Content-Type': 'application/json' };
let products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

router.get('/', (req, res) => {
  res.writeHead(200, jsonHeaders);
  res.end(JSON.stringify(products, null, 2));
});

router.post('/', (req, res) => {
  const { body: newProduct } = req;
  // to remove the product if with such id exists
  products = products.filter(product => product.id !== newProduct.id);
  products.push(newProduct);

  res.writeHead(200, jsonHeaders);
  res.end(JSON.stringify(newProduct, null, 2));
});

router.get('/:id', (req, res, next) => {
  const { id: productId } = req.params;
  const reqProduct = products.find(product => product.id === productId);

  if (reqProduct) {
    res.writeHead(200, jsonHeaders);
    res.end(JSON.stringify(reqProduct, null, 2));
  } else {
    next();
  }
});

router.get('/:id/reviews', (req, res, next) => {
  const { id: productId } = req.params;
  const reqProduct = products.find(product => product.id === productId);

  if (reqProduct) {
    res.writeHead(200, jsonHeaders);
    res.end(JSON.stringify(reqProduct.reviews, null, 2));
  } else {
    next();
  }
});

router.use('*', (req, res) => {
  res.writeHead(404, jsonHeaders);
  res.end(JSON.stringify({
    status: 404,
    message: `Cannot find product by route ${req.baseUrl}${req.url}`,
  }, null, 2));
});

export default router;
