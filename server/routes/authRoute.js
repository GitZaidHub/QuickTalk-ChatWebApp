import express from "express";
import { userLogin,userSignup } from "../controller/authController.js";
const router = express.Router();

router.post("/login",userLogin)
router.post("/signup",userSignup)

export default router;