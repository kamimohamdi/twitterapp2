"use client";
import React, { useEffect, useState } from "react";
import NavBottom from "../mainSide/NavBottom";
import NotificationMiddle from "./NotificationMiddle";
import "./notification.css";
import Loading from "@/components/modules/loading/Loading";

function Notification({ user, notifications, tweets }) {
  const [notification, setNotification] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const handler = () => {
      const notif = [];
      tweets?.map((tweet) => {
        tweet.likes.forEach((like) => {
          (like.types = "like"), notif.push(like), (like.person = like.user);
        });
        tweet?.comments.forEach((comment) => {
          (comment.types = "comment"),
            notif.push(comment),
            (comment = comment.user);
        });
        tweet?.retweets.forEach((retweet) => {
          (retweet.types = "retweet"),
            notif.push(retweet),
            (retweet.person = retweet.person);
        });
      });

      notifications?.followers.map((follow) => {
        (follow.types = "follow"),
          notif.push(follow),
          (follow.followings = notifications.followings);
      });
      notif.sort((a, b) => b.time - a.time);
      setNotification(notif);
      setLoad(false);
    };
    handler();
  }, [tweets]);

  return (
    <div className="notification">
      <div className="notification_top">
        <div className="notification_top_left">
          <img src={user.img} alt="" />
          Notification
        </div>
      </div>
      <div className="notification_middle">
        {load ? (
          <div style={{ marginTop: "20px" }} className="loading_styles">
            <Loading color="var(--twitter)" width="50px"></Loading>
          </div>
        ) : (
          notification.map((item, index) => (
            <NotificationMiddle key={index} item={item} />
          ))
        )}
      </div>
      <NavBottom />
    </div>
  );
}

export default Notification;
