
import { connectDB } from "./config/db";
import { createApp } from "./app";
import dotenv from "dotenv";
dotenv.config();


export async function createServer(mongoUri?: string) {
  await connectDB(mongoUri);

  const app = createApp();
  return app;
}




  




 