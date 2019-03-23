import mongoose from 'mongoose';
import config from '../config/config';

const connectUrl = `${config.mongo.dbUrl}:${config.mongo.dbPort}/${config.mongo.dbName}`;
const connectParams = { useNewUrlParser: true };

export default mongoose.connect(
  connectUrl,
  connectParams,
  async (error) => {
    if (!error) {
      console.log('connected to DB');
      return Promise.resolve(mongoose);
    }
    throw error;
  }
);
