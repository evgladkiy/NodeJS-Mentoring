import fs from 'fs';
import models from '../models';

const { User, Product } = models;
const usersPath = `${__dirname}/../../assets/users.json`;
const productsPath = `${__dirname}/../../assets/products.json`;

const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const findAll = {
  where: true,
  truncate: true,
};

export default function DBInit(sequelize) {
  models.User.destroy(findAll);
  models.Product.destroy(findAll);

  sequelize.sync().then(() => {
    users.forEach(user => User.create(user));
    products.forEach(product => Product.create(product));
  });
}
