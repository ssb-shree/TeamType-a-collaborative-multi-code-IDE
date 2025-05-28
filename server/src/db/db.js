import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    return db;
  } catch (error) {
    console.log(`DB connection failed due to -> ${error.message || error}`);
    return null;
  }
};
