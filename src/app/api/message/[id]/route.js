import connectToDB from "@/configsdb";
import messageModel from "@/models/Message.js";
import { userAuth } from "@/utilsHelper";

export async function POST(req, { params }) {
  connectToDB();

  //params => person
  //req.id --> myself

  try {
    const { body, userId } = await req.json();
    const same = Math.ceil(Math.random() * 999999999);
    const time = Date.now();

    const messageSend = await messageModel.create({
      user: userId,
      body,
      person: params.id,
      sor: true,
      time,
      same,
    });
    const messageRecive = await messageModel.create({
      user: params.id,
      body,
      person: userId,
      sor: false,
      time,
      same,
    });

    if (!messageSend || !messageRecive) {
      return Response.json({ message: "message not send" }, { message: 420 });
    }

    return Response.json({ messageSend, messageRecive }, { message: 200 });
  } catch (err) {
    console.log("message error post --->  ", err);
    return Response.json({ message: "err" }, { message: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectToDB();

  try {
    const chatRecievd = await messageModel.findOne({ _id: params.id });

    const chatSend = await messageModel.findOne({
      same: chatRecievd.same,
      time: chatRecievd.time,
      user: chatRecievd.person,
      sor: true,
    });

    if (!chatSend) {
      return Response.json({ message: "not found" }, { status: 404 });
    }

    if (chatSend.read) {
      return Response.json({ message: "read befor" }, { status: 403 });
    }

    const changeRead = await messageModel.findOneAndUpdate(
      { _id: chatSend._id },
      { $set: { read: true } }
    );

    return Response.json(changeRead, { status: 200 });
  } catch (err) {
    console.log("message error PUT read --->  ", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}
