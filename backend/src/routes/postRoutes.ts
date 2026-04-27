import express from "express";
import { addComment, createPost, getFeed, toggleLike } from "../controllers/postController";
import { protect } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

router.get("/", protect, getFeed);
router.post("/", protect, upload.single("media"), createPost);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comments", protect, addComment);

export default router;
