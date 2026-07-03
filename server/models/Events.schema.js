import mongoose from "mongoose";
let eventSchema = new mongoose.Schema(
  {
    // Basic Information
    title: { type: String, required: true, maxlength: 200 },
    description: { type: String, maxlength: 5000, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [String],
    // Organizer Reference
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
    // Date & Time
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    timezone: { type: String, required: true },
    // Venue Information
    venueId: { type: mongoose.Schema.Types.ObjectId, ref: "Venue" },
    venue: {
      name: String,

      address: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
      coordinates: {
        type: { type: String, enum: ["Point"] },
        coordinates: [Number], // [longitude, latitude]
      },
      capacity: { type: Number, required: true },
      ageRestriction: { type: String },
      dressCode: { type: String },
      parkingInfo: { type: String },
      accessibilityInfo: { type: String },
    },

    // Media
    images: [{ url: String, isPrimary: Boolean, uploadedAt: Date }],
    videosUrl: String,
    // LineUp & Details
    lineUp: [
      {
        name: String,
        role: String,
        image: String,
        startTime: String,
        endTime: String,
      },
    ],
    ticketTiers: [
      {
        _id: new mongoose.Schema.Types.ObjectId(),
        name: String,
        price: Number,
        quantity: Number,
        quantitySold: { type: Number, default: 0 },
        quantityRemaining: Number,
        startSaleDate: Date,
        endSaleDate: Date,
        maxPerPerson: Number,
        isActive: { type: Boolean, default: true },
      },
    ],
    // Pricing & Status
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    totalCapacity: { type: Number, required: true },
    ticketsSold: { type: Number, default: 0 },
    // Events Status
    status: {
      type: String,
      enum: ["draft", "published", "ongoing", "completed", "cancelled"],
      default: "draft",
    },
    publishedDate: { type: Date },
    // Ratings & Reviews
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    // Cancellation
    isCancelled: { type: Boolean, default: false },
    cancellationReason: { type: String },
    cancellationDate: { type: Date },
    // Promotional
    discountCodes: [
      {
        code: { type: String, unique: true },
        discountPercentage: { type: Number, min: 0, max: 100 },
        discountAmount: { type: Number, min: 0 },
        maxUses: { type: Number, min: 1 },
        usedCount: { type: Number, default: 0 },
        validFrom: { type: Date },
        validUntil: { type: Date },
      },
    ],
    // Analytics
    views: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    // SEO & SEARCH
    slug: { type: String, unique: true },
  },
  { timestamps: true },
);
const event = mongoose.models.event || mongoose.model("Events", eventSchema);
export default event;
