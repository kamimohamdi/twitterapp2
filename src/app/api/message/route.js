import connectToDB from "@/configsdb";
import messageModel from "@/models/Message.js";
import UserModel from "@/models/User.js";
import { userAuth } from "@/utilsHelper";

export async function POST(req) {
  connectToDB();

  const { person, user } = await req.json();

  try {
    const messages = await UserModel.findOne({ _id: user })
      .populate("messages")
      .lean();

    const messageSend = messages.messages.filter(
      (ms) => ms.person === person && ms.sor == true
    );
    const messageRecive = messages.messages.filter(
      (ms) => ms.person === person && ms.sor == false
    );

    return Response.json(
      { messageSend: messageSend, messageRecive: messageRecive },
      { status: 200 }
    );
  } catch (err) {
    console.log("message post error ----> ", err);

    return Response.json({ message: err }, { status: 500 });
  }
}

export async function GET(req) {
  connectToDB();

  try {
    const userId = await userAuth();
    const message = await UserModel.findOne(
      { _id: userId._id },
      "-password -__v "
    )
      .populate("messages")
      .lean();

    return Response.json(message);
  } catch (err) {
    console.log("message get error ----> ", err);

    return Response.json({ message: "err" }, { status: 500 });
  }
}
