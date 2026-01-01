import mongoose from "mongoose";

/* ======================================================
   VIDEO PROGRESS (NESTED UNDER COURSE)
====================================================== */
const videoProgressSchema = new mongoose.Schema(
  {
    videoId: { type: String, required: true },

    watchedSeconds: { type: Number, default: 0 },
    durationSeconds: { type: Number, default: 0 },

    completed: { type: Boolean, default: false },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

/* ======================================================
   COURSE PROGRESS (COURSE + CHANNEL LEVEL)
====================================================== */
const courseProgressSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true },
    courseTitle: { type: String, required: true },
    courseThumbnail: String,

    channelId: { type: String, required: true },
    channelName: { type: String, required: true },
    channelThumbnail: String,

    totalSeconds: { type: Number, required: true },
    watchedSeconds: { type: Number, default: 0 },

    startedAt: { type: Date, default: Date.now },
    lastAccessed: { type: Date, default: Date.now },

    videos: [videoProgressSchema],
  },
  { _id: false }
);

/* ======================================================
   USER SCHEMA (SOURCE OF TRUTH)
====================================================== */
const userSchema = new mongoose.Schema(
  {
    /* ================= AUTH ================= */
    name: {
  type: String,
  trim: true,
},

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    verificationTokenExpiresAt: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpiresAt: {
      type: Date,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },

    /* ================= WATCH LATER ================= */
    savedVideos: [
      {
        videoId: { type: String, required: true },
        title: String,
        thumbnail: String,
        channelName: String,
        channelId: String,
        courseId: String,
        savedAt: { type: Date, default: Date.now },
      },
    ],

    /* ================= LEARNING PROGRESS ================= */
    courseProgress: [courseProgressSchema],

    /* ================= PROFILE ================= */
    phone: String,

    bio: {
      type: String,
      maxLength: 300,
    },

    location: {
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent OverwriteModelError in dev / hot reload
export const User =
  mongoose.models.User || mongoose.model("User", userSchema);