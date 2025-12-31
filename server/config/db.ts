
import mongoose from "mongoose";

export async function connectDB(mongoUri?: string) {
  try {
    const uri = mongoUri || process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(" MONGODB_URI is not defined in environment variables");
    }

    
    await mongoose.connect(uri);

    console.log(" Connected to MongoDB Atlas ✅");
  } catch (error) {
    console.error(" Failed to connect to MongoDB Atlas ❌:", error);
    process.exit(1);
  }
}