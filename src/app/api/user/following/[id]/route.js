import connectToDB from "@/configsdb";
import followingModel from "@/models/Following.js";
import followerModel from "@/models/Follower.js";

export async function POST(req, { params }) {
  connectToDB();
  const { userId } = await req.json();
  try {
    const followings = await followingModel.findOne({
      $or: [{ user: userId }, { person: params.id }],
    });
    const followers = await followerModel.findOne({
      $or: [{ user: userId }, { person: params.id }],
    });

    const following = await followingModel.create({
      user: userId,
      person: params.id,
      time: Date.now(),
    });

    const follower = await followerModel.create({
      user: params.id,
      person: userId,
      time: Date.now(),
    });
    return Response.json([followers, followings], { statuse: 200 });
  } catch (err) {
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}
export async function DELETE(req, { params }) {
  connectToDB();
  const { userId } = await req.json();
  try {
    const followings = await followingModel.findOne({
      $or: [{ user: userId }, { person: params.id }],
    });
    const followers = await followerModel.findOne({
      $or: [{ user: params.id }, { person: userId }],
    });

    if (!followers || !followings) {
      return Response.json({ message: "exit before" }, { status: 420 });
    }

    const following = await followingModel.findOneAndDelete({
      $or: [{ user: userId }, { person: params.id }],
    });
    const follower = await followerModel.findOneAndDelete({
      $or: [{ user: params.id }, { person: userId }],
    });
    return Response.json([following, follower], { statuse: 200 });
  } catch (err) {
    return Response.json({ message: "err" }, { statuse: 500 });
  }
}
