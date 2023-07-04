import { Mongoose, connect } from 'mongoose';

let conn: Mongoose | null = null;

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

if (!uri || !dbName) {
  throw new Error('Mongo configuration is missing.');
}

export const connectToDB = async () => {
  if (conn == null) {
    conn = await connect(uri, {
      serverSelectionTimeoutMS: 5000,
      dbName,
    });
  }

  return conn;
};
