import LeftSide from "@/components/templates/leftSide/LeftSide";
import MainSide from "@/components/templates/mainSide/MainSide";
import Profile from "@/components/templates/profile/Profile";
import RightSide from "@/components/templates/rightSide/RightSide";
import { ContextProvider } from "../../../context/useContext";
import userModel from "@/models/User.js";
import tweetModel from "@/models/Tweet.js";

import "@/styles/global.css";
import { userAuth } from "@/utilsHelper";

async function page() {
  const userId = await userAuth();
  const user = await userModel
    .findOne({ _id: userId._id })
    .populate("tweets")
    .populate("retweets")
    .populate("comments")
    .populate("followers")
    .populate("followings")
    .lean();

  const tweets = await tweetModel
    .find({ user: user._id })
    .populate("retweets")
    .populate("comments")
    .populate("likes")

    .lean();

  return (
    <div className="container">
      <ContextProvider>
        <LeftSide user={user} />
        <Profile user={user} tweets={tweets} userId={userId} />
      </ContextProvider>
      <RightSide />
    </div>
  );
}

export default page;
