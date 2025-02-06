import connectToDB from "@/configsdb";
import userModel from "@/models/User.js";

export async function GET(req, { params }) {
  connectToDB();

  try {
    const user = await userModel.findOne(
      { _id: params.id },
      "-__v -password -identifier -updatedAt -createdAt"
    );
    if (!user) {
      return Response.json({ message: "user not found" }, { status: 420 });
    }

    return Response.json(user, { status: 200 });
  } catch (err) {
    console.log("err for getmessage users --->", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}
