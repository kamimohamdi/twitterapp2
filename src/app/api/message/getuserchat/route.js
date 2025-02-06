import connectToDB from "@/configsdb";
import userModel from "@/models/User";

export async function GET() {
  connectToDB();

  try {
    const user = await userModel.find({}, "-password -__v ");

    return Response.json(user, { status: 200 });
  } catch (err) {
    console.log("error for get users for serach message --->", err);
    return Response.json("err", { status: 500 });
  }
}
