import { Request, Response } from "express";
import User from "../models/User";
import { asyncHandler } from "../utils/asyncHandler";

const profileFields = ["name", "role", "sport", "country", "city", "bio", "avatar", "position", "club", "rating"];

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id || req.user?._id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "Profile not found" });
  }

  return res.json({ user });
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  const updates = profileFields.reduce<Record<string, unknown>>((acc, field) => {
    if (req.body[field] !== undefined) {
      acc[field] = req.body[field];
    }
    return acc;
  }, {});

  if (req.file) {
    updates.avatar = `/uploads/${req.file.filename}`;
  }

  const user = await User.findByIdAndUpdate(req.user?._id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  return res.json({ user });
});

export const discoverProfiles = asyncHandler(async (req: Request, res: Response) => {
  const query = String(req.query.q || "").trim();
  const sport = String(req.query.sport || "").trim();

  const filter: Record<string, unknown> = {};

  if (query) {
    filter.$or = [
      { name: new RegExp(query, "i") },
      { sport: new RegExp(query, "i") },
      { club: new RegExp(query, "i") },
      { city: new RegExp(query, "i") },
    ];
  }

  if (sport) {
    filter.sport = new RegExp(sport, "i");
  }

  const users = await User.find(filter).select("-password").sort({ rating: -1, createdAt: -1 }).limit(25);
  return res.json({ users });
});
