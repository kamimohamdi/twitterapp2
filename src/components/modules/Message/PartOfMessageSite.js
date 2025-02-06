"use client";
import React, { useState, useEffect } from "react";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function PartOfMessageSite({ id, chatHandler }) {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState([]);
  const [time, setTime] = useState("");
  const [read, setRead] = useState(false);
  const [lengthData, setLengthData] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const handler = async () => {
      const res = await fetch(`api/user/getmessageuser/${id}`);
      const data = await res.json();
      setUser(data);
    };

    //this function for get last message for show last message and get times and set read or not read message
    const handler2 = async () => {
      const res = await fetch(`${siteURL}/api/message`);
      const data = await res.json();
      const messages = data.messages.filter((message) => message.person === id);
      setMessage(messages[messages.length - 1]);

      if (message) {
        const messageTime = message.time;
        const time = new Date(messageTime);
        const Hourse = time.getHours();
        const Minute = time.getMinutes();
        setTime(Hourse + ":" + Minute);
      }

      if (message && !message.sor && !message.read) {
        setRead(true);
      } else {
        setRead(false);
      }
    };

    handler();
    handler2();

    setTimeout(() => setRefresh(!refresh), 10000);

    return () => clearTimeout();
  }, [refresh]);

  return (
    <div
      style={{ cursor: "pointer" }}
      className="main_nav_write_direct_site_middle"
      onClick={(e) => {
        chatHandler(id), setRead(false);
      }}
    >
      <div className="main_nav_write_direct_site_middle_images">
        <img src={user?.img} alt="" />
        {read ? <span></span> : <></>}
      </div>
      <div className="main_nav_write_direct_site_middle_title">
        <span>
          {user?.name} <span>@{user?.username}</span>
        </span>
        <p>
          {message ? (
            <>
              {message.sor
                ? `You:${message.body}`
                : `${user?.name}:${message.body}`}
            </>
          ) : (
            "Last Time Ago"
          )}
        </p>
      </div>
      <span>{time.length > 0 ? time : "Last Time"}</span>
    </div>
  );
}

export default PartOfMessageSite;
