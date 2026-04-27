import { Request, Response } from "express";
import Post from "../models/Post";
import { asyncHandler } from "../utils/asyncHandler";

const populateAuthor = {
  path: "author",
  select: "name role sport country city avatar rating position club",
};

export const getFeed = asyncHandler(async (_req: Request, res: Response) => {
  const posts = await Post.find().populate(populateAuthor).sort({ createdAt: -1 }).limit(50);
  return res.json({ posts });
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { caption, sport, location, tags } = req.body;

  if (!caption) {
    return res.status(400).json({ message: "Caption is required" });
  }

  const post = await Post.create({
    author: req.user?._id,
    caption,
    sport: sport || req.user?.sport || "Football",
    location,
    tags: typeof tags === "string" ? tags.split(",").map((tag) => tag.trim()).filter(Boolean) : tags || [],
    mediaUrl: req.file ? `/uploads/${req.file.filename}` : req.body.mediaUrl,
    mediaType: req.file?.mimetype.startsWith("video/") ? "video" : req.file || req.body.mediaUrl ? "image" : undefined,
  });

  const populated = await post.populate(populateAuthor);
  return res.status(201).json({ post: populated });
});

export const toggleLike = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const userId = req.user?._id;
  const alreadyLiked = post.likes.some((like) => like.equals(userId));

  post.likes = alreadyLiked ? post.likes.filter((like) => !like.equals(userId)) : [...post.likes, userId!];
  await post.save();

  const populated = await post.populate(populateAuthor);
  return res.json({ post: populated });
});

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (!req.body.text) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  post.comments.push({ user: req.user?._id!, text: req.body.text, createdAt: new Date() });
  await post.save();

  const populated = await post.populate(populateAuthor);
  return res.status(201).json({ post: populated });
});
