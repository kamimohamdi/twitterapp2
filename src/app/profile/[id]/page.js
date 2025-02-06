import LeftSide from "@/components/templates/leftSide/LeftSide";
import MainSide from "@/components/templates/mainSide/MainSide";
import Profile from "@/components/templates/profile/Profile";
import RightSide from "@/components/templates/rightSide/RightSide";
import userModel from "@/models/User.js";
import tweetModel from "@/models/Tweet.js";
import { redirect } from "next/navigation";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

import "@/styles/global.css";
import { userAuth } from "@/utilsHelper";
import { ContextProvider } from "../../../../context/useContext";

async function page({ params }) {
  const userId = await userAuth();

  if (params.id === userId._id) {
    redirect(`${siteURL}/myprofile`);
  } else if (!userId) {
    redirect(`${siteURL}/profile`);
  }

  const user = await userModel
    .findOne({ _id: params.id })
    .populate("retweets")
    .populate("comments")
    .populate("likes")
    .populate("followers")
    .populate("followings")
    .populate("tweets")
    .lean();

  const tweets = await tweetModel
    .find({ user: params.id })
    .populate("retweets")
    .populate("comments")
    .populate("likes")
    .lean();

  return (
    <div className="container">
      <ContextProvider>
        <LeftSide user={userId} />
        <Profile user={user} tweets={tweets} pr={true} userId={userId} />
      </ContextProvider>
      <RightSide />
    </div>
  );
}

export default page;
