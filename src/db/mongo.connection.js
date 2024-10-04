import mongoose from 'mongoose';
import { DB_NAME } from '../constants/constants.js';

const CONNECT_DB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}/?retryWrites=true&w=majority`
    );
    console.log(
      'mongodb successfully connected on host ',
      connection.connection.host
    );
  } catch (error) {
    if (error) throw error;
    console.log('mongodb connection failed', error);
  }
};

export { CONNECT_DB };
