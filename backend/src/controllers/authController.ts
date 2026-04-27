import { Request, Response } from "express";
import User from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";
import { signToken } from "../utils/jwt";

const authResponse = (user: any) => ({
  token: signToken(user),
  user: user.toJSON(),
});

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role, sport, country, city, position, club } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    sport,
    country,
    city,
    position,
    club,
  });

  return res.status(201).json(authResponse(user));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  return res.json(authResponse(user));
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  return res.json({ message: "Logged out" });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  return res.json({ user: req.user });
});
