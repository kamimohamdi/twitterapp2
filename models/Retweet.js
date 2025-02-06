import mongoose from "mongoose";
import userModel from "./User";
import tweetModel from "./Tweet";
import commentModel from "./Comment";

export const schema = new mongoose.Schema({
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tweet",
    required: true,
  },
  number: {
    type: Number,
    required: true,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  time: {
    type: Number,
    default: Date.now(),
  },
  reTweet: {
    type: Boolean,
    default: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const model = mongoose.models?.retweet || mongoose.model("retweet", schema);

export default model;
