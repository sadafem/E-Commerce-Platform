import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB_NAME || 'ecommerce';

let client: MongoClient;

export const connectToMongoDB = async () => {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(DB_NAME);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

export const getMongoDB = () => {
  if (!client) {
    throw new Error('MongoDB not connected');
  }
  return client.db(DB_NAME);
};