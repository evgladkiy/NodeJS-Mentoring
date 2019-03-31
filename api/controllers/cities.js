import { CityModel } from '../../src/models';
import { createNotFindByIdError, createDBError, addModifiedDateTo, createValidationModelError } from '../../src/utils';

function getCities(req, res, next) {
  CityModel.find({})
    .then(cities => res.json(cities))
    .catch(() => next(createDBError()));
}

function postCity(req, res, next) {
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
}

function deleteCity(req, res, next) {
  CityModel.findByIdAndDelete(req.params.id)
    .then(city => {
      if (city) {
        res.json(city);
      } else {
        next(createNotFindByIdError('city', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
}

function putCity(req, res, next) {
  const { params, body } = req;
  const newCity = addModifiedDateTo(body);

  CityModel.findByIdAndUpdate(params.id, newCity, { new: true, upsert: true })
    .then(city => {
      if (city) {
        res.json(city);
      } else {
        next(createNotFindByIdError('city', req.params.id));
      }
    })
    .catch(() => next(createDBError()));
}

export { deleteCity, getCities, postCity, putCity };
