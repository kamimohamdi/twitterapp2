import { userAuth } from "@/utilsHelper";
import React from "react";
import tweetModel from "@/models/Tweet.js";
import { ContextProvider } from "../../../../context/useContext";
import RightSide from "@/components/templates/rightSide/RightSide";
import TweetSearch from "@/components/templates/search/tweetSearch";
import LeftSide from "@/components/templates/leftSide/LeftSide";

async function page(req) {
  const user = await userAuth();
  const search = req.searchParams.q;

  const tweets = await tweetModel
    .find({})
    .populate("likes")
    .populate("retweets");
  const tweetUser = [];
  tweets.map((tweet) => {
    if (tweet.body.includes(search)) {
      tweetUser.push(tweet);
    }
  });

  return (
    <div className="container">
      <ContextProvider>
        <LeftSide user={user} />
      </ContextProvider>
      <TweetSearch id={user._id} search={search} />
      <RightSide />
    </div>
  );
}

export default page;
