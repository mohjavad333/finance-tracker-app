import dotenv from "dotenv";
dotenv.config();

import { createServer } from "./index";

async function start() {
  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is missing");
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("❌ JWT_SECRET is missing");
  }

  const app = await createServer(process.env.MONGODB_URI);

  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
}

start();
