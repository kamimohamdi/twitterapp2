import mongoose from "mongoose";
import userModel from "./User";
import tweetModel from "./Tweet";
import retweettModel from "./Retweet";
import liketModel from "./Like.js";

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
  body: {
    type: String,
    required: true,
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
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

schema.virtual("retweets", {
  ref: "retweet",
  localField: "_id",
  foreignField: "tweet",
});
schema.virtual("likes", {
  ref: "like",
  localField: "_id",
  foreignField: "tweet",
});
schema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "comment",
});

const model = mongoose.models?.comment || mongoose.model("comment", schema);

export default model;
