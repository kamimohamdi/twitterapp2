import connectToDB from "@/configsdb";
import { userAuth } from "@/utilsHelper";
import userModel from "@/models/User.js";

export async function GET(req, { params }) {
  connectToDB();
  const user = await userModel
    .findOne({ _id: params.id })//find  - findOne -findAndOneDelete -findAndOneUpdate - create

    //////
    .populate("retweets")
    .populate("tweets")
    .populate("likes")
    .populate("comments")
    .populate("followers")
    .populate("followings")
    .populate("messages")
    .lean();
  return Response.json(user,{status:200});
}
export async function PUT(req, { params }) {
  connectToDB();
  try {
    const { userId } = await req.json();
    const user = await userModel.findOneAndUpdate(
      { _id: userId },
      { ...params.id }
    );

    return Response.json(user);
  } catch (err) {
    console.log("err put value in user ---> ", err);
    return Response.json({ message: "err" }, { statuse: 200 });
  }
}
