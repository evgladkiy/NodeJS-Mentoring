import mongoose from 'mongoose';
import fs from 'fs';

import config from '../config/config';
import CityModel from '../models/city';
import ProductModel from '../models/product';
import UserModel from '../models/user';

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
          console.log('cities initializing');
          await CityModel.create(JSON.parse(initialCities));
        }

        if (productsFromDB.length === 0) {
          const initialProducts = fs.readFileSync(`${__dirname}/../../assets/products.json`, 'utf8');
          console.log('products initializing');
          await ProductModel.create(JSON.parse(initialProducts));
        }

        if (usersFromDB.length === 0) {
          const initialUsers = fs.readFileSync(`${__dirname}/../../assets/users.json`, 'utf8');
          console.log('users initializing');
          await UserModel.create(JSON.parse(initialUsers));
        }

        console.log('DB started');
      } catch (err) {
        return Error('Something went wrong');
      }
    }

    return Error('Connection to DB error');
  }
);
