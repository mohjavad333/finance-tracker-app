import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import transactionRoutes from "./routes/transaction.routes";

export function createApp() {
  const app = express();

  // 🔹 Global middleware
  app.use(express.json());

  // 🔹 Health check
  app.get("/", (req, res) => {
    res.send("✅ Server connected to MongoDB Atlas!");
  });

  // 🔹 Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/transactions", transactionRoutes);

  return app;
}
