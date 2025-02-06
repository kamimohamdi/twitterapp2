import connectToDB from "@/configsdb";
import userModel from "@/models/User.js";
import { userAuth } from "@/utilsHelper";

export async function GET(req, { params }) {
  connectToDB();

  try {
    const auth = await userAuth();
    const users = await userModel
      .findOne({ _id: auth._id })
      .populate("followings")
      .populate("followers")
      .populate("messages")
      .lean();

    return Response.json(users, { status: 200 });
  } catch (err) {
    console.log("err for get usersMessage ----> ", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}
