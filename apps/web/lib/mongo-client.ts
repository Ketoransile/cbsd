import { MongoClient, Db } from "mongodb";

let globalWithMongo = global as typeof globalThis & {
  _mongoDb?: Db;
};

function getDb(): Db {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoDb) {
      const client = new MongoClient(uri);
      globalWithMongo._mongoDb = client.db();
    }
    return globalWithMongo._mongoDb;
  }

  const client = new MongoClient(uri);
  return client.db();
}

export const mongoDb: Db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});
