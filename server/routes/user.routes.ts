import { Router } from "express";
import { getMe } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// 🔐 Get current logged-in user
router.get("/me", authMiddleware, getMe);

export default router;
