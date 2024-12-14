import mongoose from "mongoose";

export default async function connectToDataBase() {
  await mongoose.connect(Bun.env.MONGO_DB_URL!);
  console.log(`mongo db connected !`)
}
