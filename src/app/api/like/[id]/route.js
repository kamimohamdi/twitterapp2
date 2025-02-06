import connectToDB from "@/configsdb";
import likeModel from "@/models/Like.js";

export async function DELETE(req, { params }) {
  connectToDB();
  try {
    const likes = await likeModel.findOneAndDelete({ _id: params.id });
    if (!likes) {
      return Response.json({ message: "not valid" }, { statuse: 420 });
    }
    return Response.json(likes, { status: 200 });
  } catch (err) {
    console.log("likes DELETE server err --->", err);
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}
