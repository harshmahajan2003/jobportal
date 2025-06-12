import { application } from "express";
import mongoosefrom from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "Job",
      required: true,
    },

    application: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timeseries: true }
);
export const Application = mongoose.model("Application", applicationSchema);
