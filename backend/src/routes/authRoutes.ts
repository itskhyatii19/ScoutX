import express from "express";
import { login, logout, me, signup } from "../controllers/authController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protect, logout);
router.get("/me", protect, me);

export default router;
