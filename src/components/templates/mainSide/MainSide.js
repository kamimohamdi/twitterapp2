"use client";
import React, { useEffect, useState } from "react";
import "./mainside.css";
import Tweet from "@/components/modules/tweet/Tweet";
import { useStateContext } from "../../../../context/useContext";
import NavBottom from "./NavBottom";
import NoteWrite from "@/components/modules/Note/NoteWrite";
import MainTweetSite from "./MainTweetSite";
import MainTweetMobile from "./MainTweetMobile";
import MessageSite from "@/components/modules/Message/MessageSite";
import LoadSite from "@/components/modules/loading/LoadSite";

function MainSide({ user }) {
  const [tweet, setTweet] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { profile, setProfile, profileHandler } = useStateContext();
  const [refresh, setRefresh] = useState(false);
  const [update, setUpdate] = useState(false);
  const [mainTweet, setMainTweet] = useState(0);
  const [refreshUpdate, setRefreshUpdate] = useState(false);

  const handlerProfile = () => {
    if (profile) {
      profileHandler();
    }
  };

  useEffect(() => {
    const tweetsHandle = [];
    const handler = async () => {
      const res = await fetch("api/tweet");
      const data = await res.json();
      setMainTweet(data.length);

      await handler2();

      data.map((item) => tweetsHandle.push(item));
      setLoading(false);
      tweetsHandle.sort((a, b) => a.time - b.time);
      setTweets(tweetsHandle);
    };

    const handler2 = async () => {
      const res = await fetch("api/retweet");
      const data = await res.json();

      data.map(async (item) => {
        const res = await fetch(`api/tweet/${item.tweet}`);
        const res2 = await fetch(`api/user/${item.user}`);
        const data = await res.json();
        const data2 = await res2.json();

        data.retTweet = true;
        data.usernameRet = data2.username;
        tweetsHandle.push(data);
        setTweets(tweetsHandle);
      });
    };

    tweetsHandle.sort((a, b) => a.time - b.time);
    setTweets(tweetsHandle);

    handler();

    return () => {
      clearTimeout();
    };
  }, [refresh]);

  useEffect(() => {
    const updateTweetsHandler = async () => {
      const res = await fetch("api/tweet");
      const data = await res.json();

      if (data.length > mainTweet && !loading) {
        setUpdate(true);
        setMainTweet(data.length);
      }
    };

    updateTweetsHandler();

    setTimeout(() => {
      setRefreshUpdate(!refreshUpdate);
    }, 10000);
  }, [refreshUpdate]);

  const tweetHandler = () => {
    setTweet(!tweet);
  };

  const updateClickHandler = () => {
    setLoading(true);
    setRefresh(!refresh);
    setUpdate(false);
  };

  return (
    <main className="container_main" onClick={handlerProfile}>
      {update && (
        <div className="main_header_popup" onClick={updateClickHandler}>
          new Tweet
        </div>
      )}
      <div className="main_header">
        <div className="main_header_top">
          <div className="main_header_top_profile">
            <img onClick={profileHandler} src={user?.img} alt="" />
          </div>
          <h4>Home</h4>
          <img src="./images/TopTweet/Default.png" alt="" />
        </div>
        <MainTweetSite
          setRefresh={setRefresh}
          img={user?.img}
          tweetHandler={tweetHandler}
        />
        <MainTweetMobile
          img={user?.img}
          tweetHandler={tweetHandler}
          tweet={tweet}
          setRefresh={setRefresh}
        />
      </div>
      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "43px",
          }}
        >
          {/* <Loading color="#1da1f2" witdh="50px" /> */}
          <LoadSite />
          <LoadSite />
          <LoadSite />
          <LoadSite />
        </div>
      ) : (
        <div
          style={{
            marginBottom: "3rem",
            marginTop: "43px",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {tweets.map((tweet) => (
            <Tweet
              id={user._id}
              key={tweet._id}
              {...tweet}
              username={tweet?.usernameRet}
            />
          ))}
        </div>
      )}
      <MessageSite />
      <NavBottom />
      <NoteWrite tweetHandler={tweetHandler} />
    </main>
  );
}

export default MainSide;
