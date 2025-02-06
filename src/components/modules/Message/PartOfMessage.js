"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoCheckmarkDone, IoCheckmarkOutline } from "react-icons/io5";

function PartOfMessage({ chat, _id }) {
  const [read, setRead] = useState(false);
  const [message, setMessage] = useState(chat);
  const chatSection = useRef(null);

  useEffect(() => {
    setMessage(chat);
    const observer = new IntersectionObserver((entires) => {
      entires.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!chat.read && !chat.sor) {
            readMessageHandler();
          }
        }
      });
    });
    if (chatSection.current) {
      observer.observe(chatSection.current);
    }

    return () => {
      if (chatSection.current) {
        observer.unobserve(chatSection.current);
      }
    };
  }, [chat]);

  const readMessageHandler = async () => {
    const res = await fetch(`api/message/${chat._id}`, {
      method: "PUT",
    });
    const data = await res.json();
    if (res.status == 200) {
      setMessage(data);
      return true;
    } else {
      setMessage(chat);

      return false;
    }
  };

  return (
    <div
      className={` messagepagesite_main_chat ${
        chat.sor ? "messagepagesite_main_send" : "messagepagesite_main_get"
      } `}
      ref={chatSection}
    >
      <span
        className={` messagepagesite_chat_main ${
          chat.sor ? "messagepagesite_chat_send" : "messagepagesite_chat_get"
        }`}
      >
        {chat.body}
        {chat.sor ? (
          <span>
            {chat.read ? <IoCheckmarkDone /> : <IoCheckmarkOutline />}
          </span>
        ) : (
          <></>
        )}
      </span>
    </div>
  );
}

export default PartOfMessage;
