import mongoose from 'mongoose';
import fs from 'fs';

import config from '../config/config';
import { CityModel, UserModel, ProductModel } from '../models';
import { addModifiedDateTo } from '../utils';

const connectUrl = `${config.mongo.dbUrl}:${config.mongo.dbPort}/${config.mongo.dbName}`;
const connectParams = { useNewUrlParser: true };

// temporary solution for debugging
export default mongoose.connect(
  connectUrl,
  connectParams,
  async (error) => {
    if (!error) {
      try {
        const citiesFromDB = await CityModel.find({});
        const productsFromDB = await ProductModel.find({});
        const usersFromDB = await UserModel.find({});

        if (citiesFromDB.length === 0) {
          const initialCities = fs.readFileSync(`${__dirname}/../../assets/cities.json`, 'utf8');
          const cities = JSON.parse(initialCities);
          console.log('cities initializing');
          await CityModel.create(addModifiedDateTo(cities));
        }

        if (productsFromDB.length === 0) {
          const initialProducts = fs.readFileSync(`${__dirname}/../../assets/products.json`, 'utf8');
          const products = JSON.parse(initialProducts);
          console.log('products initializing');
          await ProductModel.create(addModifiedDateTo(products));
        }

        if (usersFromDB.length === 0) {
          const initialUsers = fs.readFileSync(`${__dirname}/../../assets/users.json`, 'utf8');
          const users = JSON.parse(initialUsers);
          console.log('users initializing');
          await UserModel.create(addModifiedDateTo(users));
        }

        console.log('DB started');
      } catch (err) {
        return Error('Something went wrong');
      }
    }
    throw error;
  }
);
