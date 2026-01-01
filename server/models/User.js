import mongoose from "mongoose";
let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: { type: String, default: "" },
    website: { type: String, default: "" },
    location: { type: String, default: "" },
    socialLinks: {
      twitter: { type: String, default: "" },
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      
    },
    language: { type: String, default: "" },
    email: { type: String, unique: true, required: true },
    password: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    isPremium: { type: Boolean, default: false },
    interest: { type: [String], default: [""] },
  },
  { timestamps: true }
);

let User = mongoose.models.user || mongoose.model("User", userSchema);
export default User;
