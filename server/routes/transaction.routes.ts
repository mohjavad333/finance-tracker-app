import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// 🔒 همه‌ی این routeها نیاز به لاگین دارن
router.use(authMiddleware);

// ➕ create transaction
router.post("/", createTransaction);

// 📄 get all transactions for user
router.get("/", getTransactions);

// ❌ delete transaction
router.delete("/:id", deleteTransaction);

export default router;
