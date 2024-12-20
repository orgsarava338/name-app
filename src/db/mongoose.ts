import mongoose from "mongoose";

export default async function connectToDataBase() {
  const uri = process.env.MONGO_DB_URL!;
  let attempt = 0;
  while (attempt < 5) {
    try {
      await mongoose.connect(uri);
      console.log(`MongoDB connected at attempt ${attempt + 1}`);
      const connectionProperties = mongoose.connection;
      console.log(`MongoDB connection properties:
        Host: ${connectionProperties.host}
        Port: ${connectionProperties.port}
        Database Name: ${connectionProperties.name}`);
      break;
    } catch (error) {
      if (attempt === 4) process.exit(1);
      console.error(`DB Connection attempt ${attempt + 1} failed :`, error);
    }
  }
}
