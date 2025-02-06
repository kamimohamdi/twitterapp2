import connectToDB from "@/configsdb";
import followerModel from "@/models/Follower.js";
import userModel from "@/models/User.js";

export async function POST(req, { params }) {
  connectToDB();
  const { userId } = await req.json();
  try {
    const follow = await followerModel.findOne({
      $or: [{ user: userId }, { person: params.id }],
    });
    if (follow) {
      return Response.json({ message: "follow before" }, { statuse: 420 });
    }

    const follower = await followerModel.create({
      user: params.id,
      person: userId,
    });
    return Response.json(follower, { statuse: 200 });
  } catch (err) {
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}
export async function DELETE(req, { params }) {
  connectToDB();
  const { userId } = await req.json();
  try {
    const follow = await followerModel.findOne({
      $or: [{ user: params.id }, { person: userId }],
    });
    if (!follow) {
      return Response.json({ message: "follow before" }, { status: 420 });
    }

    const follower = await followerModel.findOneAndDelete({
      $or: [{ user: params.id }, { person: userId }],
    });
    return Response.json(follower, { statuse: 200 });
  } catch (err) {
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}

export async function GET(req, { params }) {
  connectToDB();
  try {
    const user = await userModel
      .findOne({ _id: params.id }, "-password ")
      .populate("followings")
      .populate("followers")
      .lean();

    return Response.json(user, { statuse: 200 });
  } catch (err) {
    console.log("err for get userfollow information --->", err);
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}
