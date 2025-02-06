"use client";
import Tweet from "@/components/modules/tweet/Tweet";
import React, { useEffect, useState } from "react";
import ProfileTop from "../profile/ProfileTop";
import "./maincomment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/modules/loading/Loading";
import MainCommentTop from "./MainCommentTop.js";
import MainCommentBottom from "./MainCommentBottom";
import MainTweetMobile from "../mainSide/MainTweetMobile";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
import MainTweetSite from "@/components/templates/mainSide/MainTweetSite";

function MainComment({ tweet, user }) {
  const [info, setInfo] = useState(tweet);
  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [load, setLoad] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const handler = async () => {
      const res = await fetch(`${siteURL}/api/comment`);
      const data = await res.json();
      const comment = data.filter((item) => item.tweet == tweet._id);
      setComments(comment);
      setLoad(false);
    };

    handler();

    setTimeout(() => setRefresh(!refresh), 5000);
    return () => clearTimeout();
  }, [refresh]);

  const commentHandler = () => {
    setComment(!comment);
  };

  return (
    <>
      <div className="maincomment">
        <ToastContainer position="top-center" />
        <MainCommentTop />
        {load ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading color="#1da1f2" margin="2rem" />
          </div>
        ) : (
          <>
            <Tweet {...tweet} id={user._id} />
            <div className="maincomment_comments">
              {comments.map((comment,index) => (
                <Tweet {...comment} key={index} id={user._id} cm={true} />
              ))}
            </div>
          </>
        )}
        <MainCommentBottom commentHandler={commentHandler} image={user.img} />
        <MainTweetMobile
          tweet={comment}
          tweetHandler={commentHandler}
          img={user.img}
          cm={true}
          user={user._id}
          tweetId={tweet._id}
          setRefresh={setRefresh}
        />
        <MainTweetSite
          img={user.img}
          cm={true}
          tweetId={tweet._id}
          userId={user._id}
          setRefresh={setRefresh}
        />
      </div>
    </>
  );
}

export default MainComment;
