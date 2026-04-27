import mongoose from "mongoose";

export type MediaType = "image" | "video";

export interface IPost extends mongoose.Document {
  author: mongoose.Types.ObjectId;
  caption: string;
  sport: string;
  location?: string;
  mediaUrl?: string;
  mediaType?: MediaType;
  tags: string[];
  likes: mongoose.Types.ObjectId[];
  comments: {
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];
}

const postSchema = new mongoose.Schema<IPost>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    sport: {
      type: String,
      default: "Football",
      index: true,
    },
    location: String,
    mediaUrl: String,
    mediaType: {
      type: String,
      enum: ["image", "video"],
    },
    tags: [{ type: String, trim: true }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true, trim: true, maxlength: 280 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", postSchema);
