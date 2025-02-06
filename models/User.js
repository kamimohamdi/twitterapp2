import mongoose from "mongoose";
import tweetModel from "./Tweet";
import retweetModel from "./Retweet";
import likeModel from "./Like";
import follower from "./Follower";
import following from "./Following";
import message from "./Message";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    identifier: {
      type: String,
      required: true,
    },
    typeOfIdentifier: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    biography: {
      type: String,
      required: false,
      default: "",
    },
    address: {
      type: String,
      required: false,
    },
    // message : {}
  },
  { timestamps: true }
);

schema.virtual("retweets", {
  ref: "retweet",
  localField: "_id",
  foreignField: "user",
});
schema.virtual("tweets", {
  ref: "tweet",
  localField: "_id",
  foreignField: "user",
});
schema.virtual("likes", {
  ref: "like",
  localField: "_id",
  foreignField: "user",
});
schema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "user",
});
schema.virtual("followers", {
  ref: "follower",
  localField: "_id",
  foreignField: "user",
});
schema.virtual("followings", {
  ref: "following",
  localField: "_id",
  foreignField: "user",
});
schema.virtual("messages", {
  ref: "message",
  localField: "_id",
  foreignField: "user",
});

const model = mongoose.models?.user || mongoose.model("user", schema);

export default model;
