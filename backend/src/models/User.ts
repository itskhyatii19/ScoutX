import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "athlete" | "scout" | "club" | "fan";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  sport: string;
  country: string;
  city?: string;
  bio?: string;
  avatar?: string;
  position?: string;
  club?: string;
  rating: number;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["athlete", "scout", "club", "fan"],
      default: "athlete",
    },
    sport: { type: String, default: "Football" },
    country: { type: String, default: "India" },
    city: String,
    bio: {
      type: String,
      default: "Building my scouting profile on ScoutX.",
      maxlength: 280,
    },
    avatar: String,
    position: String,
    club: String,
    rating: { type: Number, default: 72, min: 0, max: 100 },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword() {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.set("toJSON", {
  transform(_doc, ret) {
    const record = ret as unknown as Record<string, unknown>;
    delete record.password;
    delete record.__v;
    return ret;
  },
});

export default mongoose.model<IUser>("User", userSchema);
