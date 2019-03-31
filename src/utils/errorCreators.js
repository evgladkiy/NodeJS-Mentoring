export function createNotFindByIdError(item, id) {
  return {
    code: 404,
    msg: `Cannot find ${item} with id: ${id}`,
  };
}

export function createValidationModelError(model) {
  return {
    code: 400,
    msg: `Cannot create ${model}, check data you sent`,
  };
}

export function createDBError() {
  return {
    code: 500,
    msg: 'Something went wrong with DB, try again later',
  };
}

export function createNotFoundError() {
  return {
    code: 404,
    msg: `Sorry, api doesn't support this route`,
  };
}

export function createDefaultError() {
  return {
    code: 404,
    msg: 'This is default error, shown in any unexpected case',
  };
}
