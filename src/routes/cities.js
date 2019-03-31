import express from 'express';
// for task 04
// import fs from 'fs';

import { CityModel } from '../models';
import { createNotFindByIdError, createDBError, addModifiedDateTo, createValidationModelError } from '../utils';

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
  const { body: reqBody } = req;
  const newCity = addModifiedDateTo({
    ...reqBody,
    isCapital: reqBody.isCapital || false,
  });
  const createdCity = new CityModel(newCity);
  const validationError = createdCity.validateSync();
  if (validationError) {
    return next(createValidationModelError('city'));
  }

  return createdCity
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
  const newCity = addModifiedDateTo(body);

  CityModel.findOneAndUpdate(params.id, newCity, { new: true, upsert: true })
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
