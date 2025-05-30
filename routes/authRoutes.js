import express from "express";
const router = express.Router();

import { signup, login, verifyOtp } from "../controllers/authController.js";
import User from "../models/User.js";

router.post("/signup", signup);
router.post("/register", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.get("/test", (req, res) => {
  res.send("Auth route working");
});

export default router;
