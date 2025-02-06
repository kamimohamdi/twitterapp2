"use client";
import React, { useEffect, useState } from "react";
import Tweet from "@/components/modules/tweet/Tweet";
import "./profile.css";
import ProfileTop from "./ProfileTop";
import ProfileInfo from "./ProfileInfo";
import ProfileTab from "./ProfileTab";
import tweetModel from "@/models/Tweet.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function Profile({ user, tweets, pr, userId }) {
  const [tweetSet, setTweet] = useState([]);
  const [tweetLength, setTweetLength] = useState(tweets.length);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const tweetsAll = [];

    tweets.map((tweet) => {
      tweetsAll.push(tweet), setTweet(tweetsAll);
    });
    user.retweets.map(async (retweet) => {
      const res = await fetch(`${siteURL}/api/tweet/${retweet.tweet}`);
      const data = await res.json();
      data.retTweet = true;
      tweetsAll.push(data);
      setTweet(tweetsAll);
      setTweetLength(tweetsAll.length);
    });

    tweetsAll.sort((a, b) => a.time - b.time);
    setTweet(tweetsAll);
  }, [refresh]);

  useEffect(() => {
    if (user) {
      setRefresh(!refresh);
      setTimeout(() => setRefresh(!refresh), 10000);
    }

    return () => clearTimeout();
  }, []);
  return (
    <main class="container_main">
      <ToastContainer position="top-center" />
      <ProfileTop length={tweetLength.length} name={user.name} />
      <img src="/images/Placeholder2.png" alt="" class="main_profile_cover" />

      <ProfileInfo user={user} pr={pr} userId={userId} />
      <ProfileTab />
      {tweetSet.map((tweet) => (
        <Tweet
          {...tweet}
          key={tweet._id}
          id={userId._id}
          username={user.username}
        />
      ))}
    </main>
  );
}

export default Profile;
