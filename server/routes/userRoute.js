import express  from "express";
import authMiddleware from "../middleware/authMiddleware.js"
import { getUser,changeProfilePic,userProfile } from "../controller/userController.js";
const router = express.Router();

router.get("/",authMiddleware,getUser)
router.put("/change-profilepic",authMiddleware,changeProfilePic)
router.get("/:id",userProfile)

export default router