import mongoose from "mongoose";
let organizerSchema = new mongoose.Schema(
  {
    // User Reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // Business Information
    businessName: { type: String, required: true },
    businessDescription: { type: String, maxlength: 1000 },
    businessCategory: {
      type: String,
      enum: ["promoter", "venue", "organizer", "corporate"],
    },
    website: { type: String },

    // Contact
    contactEmail: { type: String },
    contactPhone: { type: String },
    // Verification
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verificationDate: { type: Date },
    verificationDocuments: [
      {
        type: { type: String, enum: ["id", "business_license", "tax_id"] },
        url: { type: String },
        uploadedAt: { type: Date },
        verified: { type: Boolean, default: false },
      },
    ],
    // Banking & Payments
    bankAccount: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      bankCode: String,
      accountType: { type: String, enum: ["current", "savings"] },
      verified: { type: Boolean, default: false },
    },
    taxId: String,
    totalEventsCreated: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    totalAttendees: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    // Settings
    comissionRate: { type: Number, default: 0.15 }, // 15% commission
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);
const Organizer =
  mongoose.models.Organizer || mongoose.model("Organizer", organizerSchema);
