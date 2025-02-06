"use client";
import React, { useEffect, useState } from "react";
import NavBottom from "../mainSide/NavBottom";
import "./tweetssearch.css";
import { FaArrowLeft } from "react-icons/fa";
import Tweet from "@/components/modules/tweet/Tweet";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function TweetSearch({ search, id }) {
  const [tweetsSearch, setTweetSearch] = useState([]);
  const route = useRouter();
  const path = usePathname();

  console.log(siteURL);
  useEffect(() => {
    const handler = async () => {
      const res = await fetch(`${siteURL}/api/tweet`);
      const data = await res.json();

      const tweet = [];
      data.map((item) => {
        if (item.body.includes(search)) {
          tweet.push(item);
        }
      });
      setTweetSearch(tweet);
    };

    handler();
  }, [id]);

  const backHandler = () => {
    route.back();
  };

  return (
    <div className="tweetssearch">
      <div className="tweetssearch_top">
        <FaArrowLeft onClick={backHandler} className="tweetssearch_top_icon" />
        <span>Serach For : {search} </span>
      </div>
      <div className="tweetssearch_tweets">
        {tweetsSearch.map((tweet) => (
          <Tweet {...tweet} key={tweet._id} id={id} />
        ))}
      </div>
    </div>
  );
}

export default TweetSearch;
