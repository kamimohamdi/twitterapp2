import connectToDB from "@/configsdb";
import commentModel from "@/models/Comment.js";

export async function GET() {
  connectToDB();

  try {
    const comments = await commentModel
      .find({})
      .populate("retweets")
      .populate("likes")
      .populate("comments")
      .lean();
    return Response.json(comments, { status: 200 });
  } catch (err) {
    console.log("err for get comments model ---->", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}
export async function POST(req) {
  connectToDB();

  try {
    const { body, user, tweet } = await req.json();
    const comment = await commentModel.create({
      body,
      tweet,
      user,
      time: Date.now(),
    });

    return Response.json(comment, { status: 200 });
  } catch (err) {
    console.log("err for get comments model ---->", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}
