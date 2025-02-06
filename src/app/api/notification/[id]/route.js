const { default: connectToDB } = require("@/configsdb");
import retweetModel from "@/models/Retweet.js";
import likeModel from "@/models/Like.js";
import commentModel from "@/models/Comment.js";
import followerModel from "@/models/Follower.js";

export async function PUT(req, { params }) {
  connectToDB();

  const { type } = await req.json();

  try {
    switch (type) {
      case "like":
        {
          await likeModel.findOneAndUpdate(
            { _id: params.id },
            { $set: { read: true } }
          );
          return Response.json({}, { status: 200 });
        }
        break;
      case "comment":
        {
          await commentModel.findOneAndUpdate(
            { _id: params.id },
            { $set: { read: true } }
          );
          return Response.json({}, { status: 200 });
        }
        break;
      case "retweet":
        {
          await retweetModel.findOneAndUpdate(
            { _id: params.id },
            { $set: { read: true } }
          );
          return Response.json({}, { status: 200 });
        }
        break;
      case "follow":
        {
          await followerModel.findOneAndUpdate(
            { _id: params.id },
            { $set: { read: true } }
          );
          return Response.json({}, { status: 200 });
        }
        break;
    }
  } catch (err) {
    console.log(" err for put read notif ====> ", err);
    return Response.json({ message: "err" });
  }
}
