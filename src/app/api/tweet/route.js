import connectToDB from "@/configsdb";
import tweetModel from "@/models/Tweet.js";
import { userAuth } from "@/utilsHelper";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
  connectToDB();

  try {
    const formData = await req.formData();
    const body = formData.get("body");
    const image = formData.get("image");

    if (!body.trim()) {
      return Response.json({ message: "body is not value" }, { status: 420 });
    }

    if (body.length > 150) {
      return Response.json(
        { message: "the body most maximum value hust 150 karekter !" },
        { status: 421 }
      );
    }

    var buffer = "";
    var filename = "";
    var imgPath = "";

    if (image) {
      buffer = Buffer.from(await image?.arrayBuffer());
      filename = Date.now() + image.name;

      imgPath = path.join(process.cwd(), "public/twitterPicture/" + filename);

      await writeFile(imgPath, buffer);
    } else {
      buffer = false;
    }

    const user = await userAuth();

    await tweetModel.create({
      body: body,
      image: buffer ? `twitterPicture/${filename}` : "",
      user: user._id,
      time: Date.now(),
    });
    return Response.json({ message: "ok" }, { status: 200 });
  } catch (err) {
    console.log("err tweet --->", err);
    return Response.json({ message: "err" }, { status: 500 });
  }
}

export async function GET(req) {
  connectToDB();
  try {
    const tweet = await tweetModel
      .find({})
      .populate("retweets")
      .populate("likes")
      .populate("comments")
      .lean();

    return Response.json(tweet);
  } catch (err) {
    return Response.json(err);
  }
}
