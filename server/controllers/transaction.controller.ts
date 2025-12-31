import { Request, Response } from "express";
import { Transaction } from "../models/Transation";

/**
 * ➕ Create new transaction
 */
export async function createTransaction(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;

    const { type, amount, category, date, description } = req.body;

    const transaction = await Transaction.create({
      user: userId,
      type,
      amount,
      category,
      date,
      description,
    });
    console.log("👉 createTransaction called");
    console.log("👉 userId:", req.user?.userId);
    console.log("👉 body:", req.body);


    return res.status(201).json({
      message: "Transaction created successfully",
      transaction,
      
    });
  } catch (error) {
    console.error("Create transaction error:", error);
    return res.status(500).json({
      message: "Failed to create transaction",
    });
  }
}

 


/**
 * 📄 Get user transactions
 */
export async function getTransactions(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;

    const transactions = await Transaction.find({ user: userId }).sort({
      date: -1,
    });

    return res.json(transactions);
  } catch (error) {
    console.error("Get transactions error:", error);
    return res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
}
/**
 * ❌ Delete transaction
 */
export async function deleteTransaction(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;
  
      const transaction = await Transaction.findOneAndDelete({
        _id: id,
        user: userId, // ⛔ فقط صاحبش اجازه حذف داره
      });
  
      if (!transaction) {
        return res.status(404).json({
          message: "Transaction not found",
        });
      }
  
      return res.json({
        message: "Transaction deleted successfully",
      });
    } catch (error) {
      console.error("Delete transaction error:", error);
      return res.status(500).json({
        message: "Failed to delete transaction",
      });
    }
  }
  