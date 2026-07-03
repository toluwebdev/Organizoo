import mongoose from "mongoose";
let userSchema = new mongoose.Schema(
  {
    // Authentication
    email: { type: String, required: true, unique: true },
    password: { type: String },
    slug:{type: String},
    phone: { type: String },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    // Profile
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    profilePicture: {
      type: String,
      default:
        "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=",
    },
    bio: { type: String, default: "", maxlength: 500 },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    // Account Type
    userType: {
      type: String,
      enum: ["attendee", "organizer", "admin"],
      default: "attendee",
    },
    // Location
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      coordinates: {
        type: { type: String, enum: ["point"], default: "point" },
        coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
      },
    },
    // Social
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    // Settings
    preferences: {
      language: { type: String, default: "en" },
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      notifications: {
        push: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
      privacy: {
        profilePublic: { type: Boolean, default: true },
        showAttendance: { type: Boolean, default: true },
        allowMessages: { type: Boolean, default: true },
      },
    },
    // Verification & Moderation
    emailVerificationOtp: { type: String },
    emailVerificationOtpExpiresAt: { type: String },

    phoneVerificationOtp: { type: String },
    phoneVerificationOtpExpiresAt: { type: String },

    resetPasswordVerificationOtp: { type: String },
    resetPasswordVerificationOtpExpiresAt: { type: String },
    isSuspended: { type: Boolean, default: false },
    suspensionReason: { type: String },
    suspensionDate: { type: Date },
    // Stats
    totalEventsAttended: { type: Number, default: 0 },
    averageRatings: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0, max: 5, min: 0 },
    // Additional fields can be added as needed
    lastLogin: { type: Date },
    lastActive: { type: Date },
  },
  { timestamps: true },
);

let User = mongoose.models.user || mongoose.model("User", userSchema);
export default User;
