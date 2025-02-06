import mongoose from "mongoose";
import userModel from "./User";

export const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  person: {
    type: String,
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
});

const model = mongoose.models?.following || mongoose.model("following", schema);

export default model;
