"use client";
import React, { useEffect, useState } from "react";
import { FaRetweet } from "react-icons/fa6";
import { BiComment } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";
import { LuShare } from "react-icons/lu";
import "@/components/templates/profile/profile.css";
import { toast } from "react-toastify";
import "./tweet.css";
import Link from "next/link";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function Tweet({
  image,
  body,
  user,
  retweets,
  comments,
  likes,
  id,
  _id,
  cm,
  retTweet,
  username,
}) {
  const [info, setInfo] = useState({});
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const handler = async () => {
      const res = await fetch(`${siteURL}/api/user/${user}`);
      const data = await res.json();
      setInfo(data);
    };

    const handler2 = async () => {
      let ret = [];
      let lek = [];
      if (cm) {
        const res = await fetch(`${siteURL}/api/comment/${_id}`);
        const data = await res.json();
        ret = data.retweets?.find((user) => user.user === id);
        lek = data.likes?.find((user) => user.user === id);
      } else {
        const res = await fetch(`${siteURL}/api/retweet/${_id}`);
        const data = await res.json();
        ret = data.retweets?.find((user) => user.user === id);
        lek = data.likes?.find((user) => user.user === id);
      }

      if (ret) {
        setIdRetweet(ret._id);
        setRetweet(true);
      } else {
        setRetweet(false);
      }
      if (lek) {
        setLikPost(true);
        setIdLike(lek._id);
      } else {
        setLikPost(false);
      }
    };

    const handler3 = async () => {
      let res = [];
      let data = [];
      if (cm) {
        res = await fetch(`${siteURL}/api/comment/${_id}`);
        data = await res.json();
        setCommentLength(data.comments?.length);
      } else {
        res = await fetch(`${siteURL}/api/retweet/${_id}`);
        data = await res.json();
      }

      setLength(data.retweets?.length);
      setLike(data.likes?.length);
    };
    handler();
    handler2();
    handler3();
    setTimeout(() => setReload(!reload), 5000);
    return () => {
      clearTimeout();
    };
  }, [reload]);

  //re
  const [retweet, setRetweet] = useState(false);
  const [idRetweet, setIdRetweet] = useState("");
  const [length, setLength] = useState(retweets?.length || 0);
  const retweetHandler = async (e) => {
    if (retweet) {
      setRetweet(!retweet);
      setLength((pre) => (pre = pre - 1));

      const res = await fetch(`${siteURL}/api/retweet/${e}`, {
        method: "DELETE",
        body: JSON.stringify({ userId: id }),
      });

      if (res.status == 200) {
        return toast("retweet !");
      } else {
        setRetweet(!retweet);
        toast("network Error");
        setLength(retweets.length);
      }
    } else {
      setRetweet(!retweet);
      setLength((pre) => (pre = pre + 1));
      const res = await fetch(`${siteURL}/api/retweet/${_id}`, {
        method: "POST",
        body: JSON.stringify({ userId: id }),
      });
      const data = await res.json();

      if (res.status == 200) {
        setIdRetweet(data._id);
        return toast("retweet !");
      } else {
        setRetweet(!retweet);
        toast("network Error");
      }
    }
  };

  //like
  const [like, setLike] = useState(likes?.length || 0);
  const [likePost, setLikPost] = useState(false);
  const [idLike, setIdLike] = useState("");
  const likeHandler = async (e) => {
    if (likePost) {
      setLike((pre) => (pre = pre - 1));
      setLikPost(!likePost);

      const res = await fetch(`${siteURL}/api/like/${e}`, {
        method: "DELETE",
      });

      if (res.status == 200) {
        return toast("unLike secsessfuly !");
      } else {
        toast("network Error");
        setLike(likes.length);
        setLikPost(!likePost);
      }
    } else {
      setLike((pre) => (pre = pre + 1));
      setLikPost(!likePost);
      const res = await fetch(`${siteURL}/api/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id, tweetId: _id }),
      });
      const data = await res.json();
      if (res.status == 200) {
        setIdLike(data._id);
        return toast("like secsessfuly !");
      } else {
        toast("network Error");
        setLike(likes.length);
        setLikPost(!likePost);
      }
    }
  };

  // cm
  const [commentLength, setCommentLength] = useState(comments?.length || 0);

  return (
    <>
      {/* <ToastContainer position="top-center" /> */}
      <div class="main_tweet">
        {retTweet && (
          <div className="main_tweet_retweet">
            <FaRetweet className="main_tweet_retweet_icon" />

            <span>from @{username}</span>
          </div>
        )}
        <div className="main_tweet_real">
          <div class="main_tweet_profile">
            <Link
              href={`${
                info._id === id
                  ? `${siteURL}/myprofile`
                  : `${siteURL}/profile/${info._id}`
              }  `}
            >
              <img src={`${siteURL}/${info.img}`} alt="" />
            </Link>
          </div>
          <div class="main_tweet_post">
            <div class="main_tweet_id">
              <div class="main_tweet_id_name">
                <Link
                  href={`${
                    info._id === id
                      ? `${siteURL}/myprofile`
                      : `${siteURL}/profile/${info._id}`
                  }  `}
                >
                  <h6>{info.name}</h6>
                </Link>
                <Link
                  href={`${
                    info._id === id
                      ? `${siteURL}/myprofile`
                      : `${siteURL}/profile/${info._id}`
                  }  `}
                >
                  <span>@{info.username}</span>
                </Link>
              </div>

              <p class="main_tweet_body">{body}</p>
            </div>
            {image ? (
              <div class="main_tweet_image">
                <img src={image} alt="" />
              </div>
            ) : null}
            <ul class="main_tweet_info">
              <li>
                <Link href={`/comment/${_id}`}>
                  <BiComment className="main_tweet_info_icon" />
                  <span>{commentLength}</span>
                </Link>
              </li>
              <li onClick={(e) => retweetHandler(idRetweet)}>
                <FaRetweet
                  className={`main_tweet_info_icon ${retweet ? "danger" : ""} `}
                />

                <span className={`${retweet ? "danger" : ""}`}>{length}</span>
              </li>
              <li onClick={(e) => likeHandler(idLike)}>
                <FaRegHeart
                  className={`main_tweet_info_icon ${
                    likePost ? "danger" : ""
                  } `}
                />

                <span className={`${likePost ? "danger" : ""}`}>{like}</span>
              </li>
              <li>
                <LuShare className="main_tweet_info_icon" />

                <span>0</span>
              </li>
            </ul>
            {cm && (
              <Link href={`/comment/${_id}`} class="main_tweet_thread">
                Show this thread
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Tweet;
