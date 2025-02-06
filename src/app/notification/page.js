import LeftSide from "@/components/templates/leftSide/LeftSide";
import Notification from "@/components/templates/notification/Notification";
import RightSide from "@/components/templates/rightSide/RightSide";
import { userAuth } from "@/utilsHelper";
import { redirect } from "next/navigation";
import React from "react";
import { ContextProvider } from "../../../context/useContext";
import userModel from "@/models/User.js";
import tweetModel from "@/models/Tweet.js";
import connectToDB from "@/configsdb";

async function page() {
  await connectToDB();
  const user = await userAuth();
  if (!user) {
    redirect("/login");
  }

  const notifications = await userModel
    .findOne({ _id: user._id })
    .populate("followers")
    .populate("followings")
    .lean();

  const tweets = await tweetModel
    .find({ user: user._id })
    .populate("likes")
    .populate("comments")
    .populate("retweets")
    .lean();
  console.log("tweets ===========>", tweets);

  const userInfo = await userModel
    .findOne({ _id: user._id })
    .populate("followings")
    .populate("followers")
    .lean();

  return (
    <div className="container">
      <ContextProvider>
        <LeftSide user={user} userInfo={userInfo} />
      </ContextProvider>
      <Notification user={user} notifications={notifications} tweets={tweets} />
      <RightSide />
    </div>
  );
}

export default page;
