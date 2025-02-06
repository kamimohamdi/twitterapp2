"use client";
import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { BiSolidComment } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa6";
import Loading from "@/components/modules/loading/Loading";
import Link from "next/link";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function NotificationMiddle({ type, item }) {
  const [user, setUser] = useState({});
  const [tweet, setTweet] = useState({});
  const [follow, setFollow] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const handler = async () => {
      const res = await fetch(
        `${siteURL}/api/user/getmessageuser/${
          item.types === "follow" ? item.person : item.user
        }`
      );
      const data = await res.json();

      setUser(data);
    };

    const handler2 = async () => {
      const res = await fetch(`${siteURL}/api/tweet/${item.tweet}`);
      const data = await res.json();

      setTweet(data);
    };

    const handler3 = async () => {
      if (!item.read) 
      {
        const res = await fetch(`${siteURL}/api/notification/${item._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: item.types }),
        });
        console.log(res.status);
      }
    };

    const handler4 = () => {
      const findFollow = item?.followings.find(
        (following) => following.person === item.person
      );
      if (findFollow) {
        setFollow(true);
      }
    };

    handler();
    handler3();
    item.types === "follow" && handler4();
    item.types !== "follow" && handler2();
  }, [item]);

  const followHandler = async ({ user, person }) => {
    setFollow(!follow);
    setLoad(true);
    if (follow) {
      const res = await fetch(`${siteURL}/api/user/following/${person}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user }),
      });
      if (res.status == 200) {
        setFollow(false);
        setLoad(false);
      } else {
        setFollow(true);
        setLoad(false);
        alert("err");
      }
    } else {
      const res = await fetch(`${siteURL}/api/user/following/${person}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user }),
      });
      if (res.status == 200) {
        setFollow(true);
        setLoad(false);
      } else {
        setFollow(false);
        setLoad(false);
        alert("err");
      }
    }
  };

  const switchHandler = (e) => {
    if (e === "icon") {
      switch (item.types) {
        case "like":
          return <FcLike className="notification_middle_bar_icon" />;
          break;
        case "comment":
          return <BiSolidComment className="notification_middle_bar_icon" />;
          break;
        case "retweet":
          return <FaRetweet className="notification_middle_bar_icon" />;
          break;
        case "follow":
          return follow ? (
            load ? (
              <button className="notification_middle_bar_button" disable>
                <div className="loading_styles">
                  <Loading width="15px" color="var(--twitter)"></Loading>
                </div>
              </button>
            ) : (
              <button
                onClick={() =>
                  followHandler({ user: item.user, person: item.person })
                }
                className="notification_middle_bar_button"
              >
                <div className="loading_styles">Following</div>
              </button>
            )
          ) : load ? (
            <button className="notification_middle_bar_button" disable>
              <div className="loading_styles">
                <Loading width="15px" color="var(--twitter)"></Loading>
              </div>
            </button>
          ) : (
            <button
              onClick={() =>
                followHandler({ user: item.user, person: item.person })
              }
              className="notification_middle_bar_button"
            >
              <div className="loading_styles">Follow</div>
            </button>
          );
          break;
      }
    } else {
      switch (item.types) {
        case "like":
          return `Like ${tweet.body}`;
          break;
        case "comment":
          return `Comment For ${tweet.body} : ${item.body}`;
          break;
        case "retweet":
          return `Retweet You Post :  ${tweet.body}`;
          break;
        case "follow":
          return `Follow You`;
          break;
      }
    }
  };

  return (
    <div
      className={`notification_middle_bar ${
        item.read ? "" : "notification_middle_background"
      }`}
    >
      <div className="notification_middle_bar_image">
        <Link href={`${siteURL}/profile/${item.person}`}>
          <img src={user?.img} alt="" />
        </Link>
      </div>
      <div className="notification_middle_bar_informaions">
        <div className="notification_middle_bar_informaions_username">
          <Link
            style={{ color: "black", opacity: ".5" }}
            href={`${siteURL}/profile/${item.person}`}
          >
            @{user?.username}
          </Link>
        </div>
        <div className="notification_middle_bar_informaions_title">
          {switchHandler("")}
        </div>
      </div>
      <div className="notification_middle_bar_icons">
        {switchHandler("icon")}
      </div>
    </div>
  );
}

export default NotificationMiddle;
