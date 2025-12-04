import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { getUser, changeProfilePic, userProfile, searchUsers, updateUserProfile } from "../controller/userController.js";
const router = express.Router();

router.get("/", authMiddleware, getUser)
router.get("/search", authMiddleware, searchUsers);
router.put("/change-profilepic", authMiddleware, changeProfilePic)
router.put("/update", authMiddleware, updateUserProfile)
router.get("/:id", userProfile)

export default router