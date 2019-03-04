import mongoose from 'mongoose';
import validator from 'validator';

import config from '../config/config';

const userSchema = new mongoose.Schema({
  age: {
    min: [12, 'Age must be more than 12'],
    max: 100,
    type: Number,
  },
  name: {
    required: [true, 'User name is required'],
    type: String,
  },
  email: {
    required: [true, 'User email is required'],
    type: String,
    validate: value => validator.isEmail(value),
  },
  password: {
    required: [true, 'User email is required'],
    type: String,
    validate: {
      validator: value => value.length >= 5,
      message: 'Password length must has at least 5 symbols',
    },
  },
  company: {
    type: String,
  },
  lastModifiedDate: {
    required: false,
    type: Date,
  },
});

export default mongoose.model(config.mongo.collections.users, userSchema);
