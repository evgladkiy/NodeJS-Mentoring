import mongoose from 'mongoose';

import config from '../config/config';

const productSchema = new mongoose.Schema({
  name: {
    required: [true, 'Product name is required'],
    type: String,
  },
  color: {
    required: [true, 'Product color is required'],
    type: String,
  },
  isFavorite: {
    type: Boolean,
  },
  reviews: {
    min: [0, 'Reviews must be a positive number'],
    type: Number,
  },
  lastModifiedDate: {
    required: false,
    type: Date,
  },
});

export default mongoose.model(config.mongo.collections.products, productSchema);
