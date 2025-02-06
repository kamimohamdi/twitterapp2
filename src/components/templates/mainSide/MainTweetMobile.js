"use client";

import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { FaPollH } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { RiCalendarScheduleLine } from "react-icons/ri";
import "./MainTweetMobile.css";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/modules/loading/Loading";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function MainTweetMobile({
  tweetHandler,
  tweet,
  img,
  setRefresh,
  cm,
  tweetId,
  user,
}) {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const tweetPoster = async () => {
    setLoading(true);
    if (!body.trim()) {
      return toast("your tweet is empty !");
    }

    if (body.length > 150) {
      return toast("you cant post tweet above 150 carekter !");
    }

    var formData = new FormData();
    formData.set("body", body);

    formData.append("image", image ? image : "");

    const res = await fetch(`${siteURL}/api/tweet`, {
      method: "POST",
      body: formData,
    });

    if (res.status == 200) {
      setLoading(false);

      tweetHandler();
      toast("Your Tweet Posted !");
      setBody("");
      setImage("");
      setRefresh(true);
    } else {
      setLoading(false);

      toast("try again !");
    }
  };

  const tweetComment = async () => {
    setLoading(true);
    if (!body.trim() || body.length > 150) {
      return toast("your comment is not valid");
    }

    const res = await fetch(`${siteURL}/api/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, user: user, tweet: tweetId }),
    });
    if (res.status == 200) {
      setLoading(false);

      tweetHandler();
      toast("Your Tweet Posted !");
      setBody("");
      setImage("");
      setRefresh(true);
    } else {
      setLoading(false);

      toast("try again !");
    }
  };

  return (
    <>
      <div
        className={`main_tweet_mobile ${
          tweet ? "main_tweet_on" : "main_tweet_mobile_cansel"
        }`}
      >
        <div className="main_tweet_mobile_top">
          <span onClick={tweetHandler}>Cansel</span>
          {loading ? (
            <button onClick={tweetPoster}>
              <Loading color="white" width="20px" />
            </button>
          ) : cm ? (
            <button onClick={tweetComment}>Comment</button>
          ) : (
            <button onClick={tweetPoster}>Tweet</button>
          )}
        </div>

        <div className="main_tweet_mobile_middle">
          <div className="main_tweet_mobile_profile">
            <img src={img} alt="" />
          </div>
          <div className="main_tweet_mobile_write">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </div>
        <ul className="main_tweet_mobile_bottom">
          <li>
            <label style={{ cursor: "pointer" }} htmlFor="gallery">
              <GrGallery className="main_tweet_mobile_bottom_icon" />
            </label>
            <input
              hidden
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              id="gallery"
            />
          </li>
          <li>
            <MdOutlineGifBox className="main_tweet_mobile_bottom_icon" />
          </li>
          <li>
            <FaPollH className="main_tweet_mobile_bottom_icon" />
          </li>
          <li>
            <BsEmojiSmile className="main_tweet_mobile_bottom_icon" />
          </li>
          <li>
            <RiCalendarScheduleLine className="main_tweet_mobile_bottom_icon" />
          </li>
        </ul>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
}

export default MainTweetMobile;
