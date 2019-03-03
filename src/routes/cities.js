import express from 'express';
// for task 04
// import fs from 'fs';

import CityModel from '../models/city';
import { createNotFindByIdError, createDBError } from '../utils/errorCreators';

const router = express.Router();

router.get('/', (req, res, next) => {
  // for task 04
  // const citiesPath = `${__dirname}/../../assets/cities.json`;
  // const cities = JSON.parse(fs.readFileSync(citiesPath, 'utf8'));
  // const randomIndex = Math.floor(Math.random() * cities.length);

  // return res.json(cities[randomIndex]);

  CityModel.find({})
    .then(cities => res.json(cities))
    .catch(() => next(createDBError()));
});

router.post('/', (req, res, next) => {
  new CityModel(req.body)
    .save()
    .then(city => res.json(city))
    .catch(() => next(createDBError()));
});

router.delete('/:id', (req, res, next) => {
  CityModel.findByIdAndDelete(req.params.id)
    .then(city => {
      if (city) {
        res.json(city);
      } else {
        next(createNotFindByIdError('city', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
});

router.put('/:id', (req, res, next) => {
  const { params, body } = req;

  CityModel.findByIdAndUpdate(params.id, body, { new: true, upsert: true })
    .then(city => {
      if (city) {
        res.json(city);
      } else {
        next(createNotFindByIdError('city', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
});

export default router;
