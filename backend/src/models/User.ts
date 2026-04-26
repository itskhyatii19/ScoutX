import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    sport: String,
    country: String,
    role: String,
    avatar: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);