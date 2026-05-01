import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

let db: Db;
let globalWithMongo = global as typeof globalThis & {
  _mongoDb?: Db;
};

if (process.env.NODE_ENV === "development") {
  if (!globalWithMongo._mongoDb) {
    const client = new MongoClient(uri);
    globalWithMongo._mongoDb = client.db();
  }
  db = globalWithMongo._mongoDb;
} else {
  const client = new MongoClient(uri);
  db = client.db();
}

export { db as mongoDb };
