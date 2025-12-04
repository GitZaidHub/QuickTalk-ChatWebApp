import express from "express";
import { sendFriendRequest, getPendingRequests, acceptFriendRequest, rejectFriendRequest } from "../controller/friendRequestController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", authMiddleware, sendFriendRequest);
router.get("/pending", authMiddleware, getPendingRequests);
router.post("/accept", authMiddleware, acceptFriendRequest);
router.post("/reject", authMiddleware, rejectFriendRequest);

export default router;
