import mongoose from "mongoose";
import userModel from "./User";

export const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    person: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    sor: {
      type: Boolean,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    same: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models?.message || mongoose.model("message", schema);

export default model;
