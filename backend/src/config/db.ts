import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

async function createMongoMemoryServer() {
  // Create a new instance of "MongoMemoryServer" which is automatically started
  return await MongoMemoryServer.create({
    instance: {
      port: Number(process.env.DB_PORT),
      dbName: process.env.DB_NAME,
    },
  });
}

export default async function connectDB() {
  const dbInstance = await createMongoMemoryServer();
  const uri = dbInstance.getUri();
  try {
    mongoose.connect(uri);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    await dbInstance.stop();
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log(`Database connected: ${uri}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
}
