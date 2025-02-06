import connectToDB from "@/configsdb";
import userModel from "@/models/User.js";

export async function GET() {
  connectToDB();

  try {
    const users = await userModel.find(
      {},
      "-__v -password -identifier -typeOfIdentifier -createdAt -updatedAt "
    );

    return Response.json(users, { status: 200 });
  } catch (err) {
    console.log("err for get search users ----> ", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}
