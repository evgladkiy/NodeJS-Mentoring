import mongoose from 'mongoose';

import config from '../config/config';

const citySchema = new mongoose.Schema({
  name: {
    required: [true, 'Name is required'],
    type: String,
  },
  country: {
    required: [true, 'Country is required'],
    type: String,
  },
  isCapital: {
    required: [true, 'isCapital is required'],
    type: Boolean,
  },
  location: {
    lat: {
      required: [true, 'Latitude is required'],
      type: Number,
    },
    long: {
      required: [true, 'Longitude is required'],
      type: Number,
    },
  },
  lastModifiedDate: {
    required: false,
    type: Date,
  },
});

export default mongoose.model(config.mongo.collections.cities, citySchema);
