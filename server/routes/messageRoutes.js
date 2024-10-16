import express from "express";
import {sendMessages,getMessages} from "../controller/messageController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/send/:id",authMiddleware,sendMessages);
router.get("/:id",authMiddleware,getMessages)
export default router