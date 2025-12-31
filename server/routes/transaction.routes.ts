import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transaction.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/", createTransaction);

router.get("/", getTransactions);

router.delete("/:id", deleteTransaction);

export default router;



