import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;

    // 1️⃣ validation
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2️⃣ check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3️⃣ create user
    const user = await User.create({
      email,
      password,
      name,
    });

    // 4️⃣ generate token
    const token = generateToken({ userId: user._id.toString() });

    // 5️⃣ response
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}


export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
  
    // 1️⃣ find user + password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // 2️⃣ compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // 3️⃣ generate token
    const token = generateToken({ userId: user._id.toString() });
  
    // 4️⃣ response
    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  }


export async function getMe(req: Request, res: Response) {
  try {
    const userId = req.user!.userId;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    return res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
