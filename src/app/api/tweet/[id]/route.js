const { default: connectToDB } = require("@/configsdb");
import reTweetModel from "@/models/Retweet.js";
import tweetModel from "@/models/tweet.js";

export async function GET(req, { params }) {
  connectToDB();

  try {
    const tweet = await tweetModel
      .findOne({ _id: params.id })
      .populate("retweets")
      .populate("likes")
      .populate("comments")
      .lean();
    return Response.json(tweet);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "err" });
  }
}

