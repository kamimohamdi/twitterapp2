import mongoose from "mongoose";
import userModel from "./User";
import retweetModel from "./Retweet";
import liketModel from "./Like";

export const schema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxLength: 150,
  },
  image: {
    type: String,
    required: false,
  },
  like: {
    type: [Object],
    required: false,
  },
  // comment :{}
  //save : {}
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  time: {
    type: Number,
    default: Date.now(),
  },
  retTweet: {
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
  foreignField: "tweet",
});

const model = mongoose.models?.tweet || mongoose.model("tweet", schema);

export default model;
