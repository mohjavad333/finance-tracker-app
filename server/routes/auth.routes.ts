import { Router } from "express";
import { register, login, getMe } from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    registerSchema.parse({ body: req.body });
    await register(req, res);
  } catch (err: any) {
    return res.status(400).json({
      message: err.errors?.[0]?.message || "Invalid request",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    loginSchema.parse({ body: req.body });
    await login(req, res);
  } catch (err: any) {
    return res.status(400).json({
      message: err.errors?.[0]?.message || "Invalid request",
    });
  }
});

router.get("/me", authMiddleware, getMe);

export default router;
