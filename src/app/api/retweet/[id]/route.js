const { default: connectToDB } = require("@/configsdb");
import reTweetModel from "@/models/Retweet.js";
import tweetModel from "@/models/tweet.js";

export async function POST(req, { params }) {
  connectToDB();
  try {
    const { userId } = await req.json();
    const ret = await reTweetModel.create({
      tweet: params.id,
      number: 0,
      user: userId,
      time: Date.now(),
    });
    return Response.json(ret, { status: 200 });
  } catch (err) {
    console.log("err tweet --->", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  connectToDB();

  try {
    const tweet = await tweetModel
      .findOne({ _id: params.id })
      .populate("retweets")
      .populate("likes")
      .lean();
    return Response.json(tweet);
  } catch (err) {
    console.log(err);
    return Response.json({ message: "err" });
  }
}

export async function DELETE(req, { params }) {
  connectToDB();
  try {
    const { userId } = await req.json();

    const users = await reTweetModel.findOneAndDelete({
      _id: params.id,
      user: userId,
    });

    if (!users) {
      return Response.json({ message: "not found " }, { status: 420 });
    }

    return Response.json({ message: "ok" }, { statuse: 200 });
  } catch (err) {
    console.log("err retweet deleted ---> ", err);
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}
