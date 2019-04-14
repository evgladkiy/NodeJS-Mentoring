require('@babel/register');
const fs = require('fs');

const { CityModel, UserModel, ProductModel } = require('../../src/models');
const { addModifiedDateTo } = require('../../src/utils');
const connectToDB = require('../../src/mongoose/connectToDB').default;

connectToDB.then(async mongoose => {
  try {
    const initialCities = fs.readFileSync(`${__dirname}/../../assets/cities.json`, 'utf8');
    const cities = JSON.parse(initialCities);
    await CityModel.create(addModifiedDateTo(cities));
    console.log('cities initialized');

    const initialProducts = fs.readFileSync(`${__dirname}/../../assets/products.json`, 'utf8');
    const products = JSON.parse(initialProducts);
    await ProductModel.create(addModifiedDateTo(products));
    console.log('products initialized');

    const initialUsers = fs.readFileSync(`${__dirname}/../../assets/users.json`, 'utf8');
    const users = JSON.parse(initialUsers);
    await UserModel.create(addModifiedDateTo(users));
    console.log('users initialized');

    console.log('DB inited');
    mongoose.connection.close();
    return;
  } catch (err) {
    throw err;
  }
})