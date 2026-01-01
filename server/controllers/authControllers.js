import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../configs/nodemailer.js";
import fs from "fs";
import imagekit from "../configs/imageKit.js";
// Sign Up
export const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(404).json({
        success: false,
        message: "All fields are Expected to be fill",
      });
    }
    const UserExist = await User.findOne({ email });

    if (UserExist) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Otp",
      text: `your OTP is ${otp}. Dont disclose this with anyone`,
    };
    await transporter.sendMail(mailOptions);
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secured: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
      maxAge: 7 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Signup Successful an email has been sent to verify your email",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Login
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: " User Not Found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .json({ success: false, message: "Password don't match" });
    }
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, message: "Log in Successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// SendVerifyOtp
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not found" });
    }
    const otp = String(Math.floor(10000 + Math.random() * 90000));
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify Otp",
      text: `your OTP is ${otp}. Dont disclose this with anyone`,
    };
    await transporter.sendMail(mailOptions);
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();
    res.status(200).json({ success: true, message: "OTP SENT SUCCESSFULLY" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// VeifyOtp
export const VerifyOtp = async (req, res) => {
  const { userId } = req;
  const { otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }
    if (user.isVerified) {
      return res
        .status(200)
        .json({ success: true, message: "User Already Verified" });
    }
    if (otp === "" || user.verifyOtp !== otp) {
      return res
        .status(401)
        .json({ success: false, message: "Otp mismatched" });
    }
    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(401).json({ success: false, message: "Otp Expired" });
    }
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User Verified Sucessfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Send Reset OTp
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }
    const otp = Math.floor(10000 + Math.random(90000));
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Reset Otp",
      text: `your OTP is ${otp}. Dont disclose this with anyone`,
    };
    await transporter.sendMail(mailOptions);
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    res.status(200).json({ success: true, message: "OTP SENT SUCCESSFULLY" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Change Password
export const ChangePassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !otp || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }
    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ sucess: false, message: "Otp Expireed" });
    }
    if (otp !== user.resetOtp) {
      return res
        .status(400)
        .json({ sucess: false, message: "Otp doesn't match" });
    }
    const hashedPassword = bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();
    res.status(200).json({
      success: true,
      message:
        "Password Reset Successfuly You can now login with your new password",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// Is Authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "user Authenticated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Change Image
export const ChangeImage = async (req, res) => {
  try {
    const image = req.file;
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User Not Found" });
    }
    const fileBuffer = fs.readFileSync(image.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: image.originalname,
      folder: "/organizoo/user",
    });
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" }, //Auto compression
        { format: "webp" }, //Convert to modern format
        { width: "1280" }, //width resizing
      ],
    });
    const imageUrl = optimizedImageUrl;
    user.profileImage = imageUrl;
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "Image Uploaded Succesfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: " User not Found Please Login  again",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: " User not Found Please Login again",
      });
    }
    return res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        imageUrl: user.profileImage,
        isVerified: user.isVerified,
        interest: user.interest,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const addInterest = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    const interest = req.body.interest;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not Authenticated" });
    }
    user.interest = [...interest];
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User Interest Updated Successfully " });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
