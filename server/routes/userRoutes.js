import express from "express";
import {
  addInterest,
  ChangeImage,
  ChangePassword,
  getUserDetails,
  isAuthenticated,
  logIn,
  sendResetOtp,
  sendVerifyOtp,
  signUp,
  VerifyOtp,
} from "../controllers/authControllers.js";
import passport from "passport";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { Auth } from "../middleware/userAuth.js";
import upload from "../middleware/multer.js";

const userRoutes = express.Router();

userRoutes.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    if (!req.user || !req.user.emails) {
      console.log("Google login failed, profile:", req.user);
      return res.redirect(`${process.env.CLIENT_URL}/login-failed`);
    }

    let user = await User.findOne({ email: req.user.emails[0].value });

    if (!user) {
      user = new User({
        name: req.user.displayName,
        email: req.user.emails[0].value,
        isVerified: true,
      });
    }
    user.profileImage = req.user.photos[0]?.value || "";
    user.isVerified = true;
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(process.env.CLIENT_URL);
  }
);

userRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
userRoutes.post("/signup", signUp);
userRoutes.post("/login", logIn);
userRoutes.post("/sendVerifyOtp", Auth, sendVerifyOtp);
userRoutes.post("/verifyOtp", Auth, VerifyOtp);
userRoutes.post("/sendResetOtp", sendResetOtp);
userRoutes.post("/changePassword", ChangePassword);
userRoutes.get("/isAuthenticated", Auth, isAuthenticated);
userRoutes.post(
  "/profileImg",
  Auth, // ✅ authenticate FIRST
  upload.single("image"), // ✅ then parse file
  ChangeImage
);
userRoutes.get("/userDetails", Auth, getUserDetails);
userRoutes.get("/addInterest", Auth, addInterest);
userRoutes.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ success: true, message: "Logout Successfully" });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
});

export default userRoutes;
