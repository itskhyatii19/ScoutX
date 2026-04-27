import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export const signToken = (user: IUser) => {
  const secret: jwt.Secret = process.env.JWT_SECRET || "scoutx-dev-secret";
  const expiresIn = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

  return jwt.sign({ id: user._id, role: user.role }, secret, {
    expiresIn,
  });
};
