import connectToDB from "@/configsdb";
import commentModel from "@/models/comment";

export async function GET(req, { params }) {
  connectToDB();
  try {
    const comment = await commentModel
      .findOne({ _id: params.id })
      .populate("likes")
      .populate("retweets")
      .populate("comments")
      .lean();
    return Response.json(comment, { status: 200 });
  } catch (err) {
    console.log("err for Get id comments ---> ", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}
