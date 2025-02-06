import connectToDB from "@/configsdb";
import likeModel from "@/models/Like.js";

export async function GET() {
  connectToDB();

  try {
    const likes = await likeModel.find();
    return Response.json(likes, { status: 200 });
  } catch (err) {
    console.log("likes GET server err --->", err);
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}

export async function POST(req) {
  connectToDB();
  try {
    const { userId, tweetId } = await req.json();

    const users = await likeModel.findOne({ tweet: tweetId, user: userId });
    if (users) {
      return Response.json(like, { status: 420 });
    }

    const like = await likeModel.create({
      tweet: tweetId,
      user: userId,
      time: Date.now(),
    });
    return Response.json(like, { status: 200 });
  } catch (err) {
    console.log("likes POST server err --->", err);
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}
