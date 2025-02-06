import mongoose from "mongoose";
import userModel from "./User";
import tweetModel from "./Tweet";

export const schema = new mongoose.Schema({
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tweet",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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

const model = mongoose.models?.like || mongoose.model("like", schema);

export default model;
