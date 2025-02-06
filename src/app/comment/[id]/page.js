import LeftSide from "@/components/templates/leftSide/LeftSide";
import MainComment from "@/components/templates/mainComment/MainComment";
import RightSide from "@/components/templates/rightSide/RightSide";
import { userAuth } from "@/utilsHelper";
import React from "react";
import { ContextProvider } from "../../../../context/useContext";
import tweetModel from "@/models/Tweet.js";
import MainTweetSite from "@/components/templates/mainSide/MainTweetSite";

async function page({ params }) {
  const user = await userAuth();
  const tweet = await tweetModel
    .findOne({ _id: params.id })
    .populate("likes")
    .populate("retweets")
    .populate("comments")
    .lean();

  return (
    <div className="container">
      <ContextProvider>
        <LeftSide user={user} />
      </ContextProvider>
      <MainComment tweet={tweet} user={user} />
      <RightSide />
    </div>
  );
}

export default page;
