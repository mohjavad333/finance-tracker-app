import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";

export async function getMe(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    createdAt: req.user.createdAt,
  });
}
