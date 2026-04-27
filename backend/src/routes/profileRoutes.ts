import express from "express";
import { discoverProfiles, getProfile, updateProfile } from "../controllers/profileController";
import { protect } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = express.Router();

router.get("/discover", protect, discoverProfiles);
router.get("/me", protect, getProfile);
router.patch("/me", protect, upload.single("avatar"), updateProfile);
router.get("/:id", protect, getProfile);

export default router;
