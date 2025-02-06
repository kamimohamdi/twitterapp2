"use client";
import React, { useEffect, useState, useRef } from "react";
import "./MessgaeSite.css";
import { TbMessageCirclePlus } from "react-icons/tb";
import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import PartOfMessageSite from "./PartOfMessageSite";
import MessagePageSite from "./MessagePageSite";
import Loading from "../loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MessageSite() {
  const [message, setMessage] = useState(false);
  const [mySelf, setMySelf] = useState("");
  const [messages, setMessages] = useState(false);
  const [load, setLoad] = useState(true);
  const [chat, setChat] = useState(false);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  // new messages
  const [followings, setFollowings] = useState([]);
  const [sendNewMessage, setSendNewMessage] = useState(false);
  const [showUsersForMessage, setShowUsersForMessage] = useState(false);

  const newMessageHandler = async (e) => {
    setShowUsersForMessage(!showUsersForMessage);
    setRefresh(!refresh);
    setUser(e);
  };

  const newChatHandler = async () => {
    setMessage(false);
    setSendNewMessage(!sendNewMessage);
    // newMessageHandler();
    setRefresh(!refresh);
  };

  useEffect(() => {
    const handler = async () => {
      const res = await fetch("api/message");
      const data = await res.json();
      const users = [];
      data.messages.map((message) => users.push(message.person));

      const usersReal = users.filter(
        (item, index) => users.indexOf(item) === index
      );

      setMessages(usersReal);
      setLoad(false);
    };

    const handler2 = async () => {
      const res = await fetch(`api/message/usersMessages`);
      const data = await res.json();
      setMySelf(data._id);
      const users = [];
      data.followings.filter((item) => users.push(item.person));
      setFollowings(users);
    };
    handler2();
    handler();
    setTimeout(() => setRefresh(!refresh), 5000);

    return () => clearTimeout();
  }, [refresh]);

  const messageHandler = () => {
    setMessage(!message);
    setSendNewMessage(false);
  };
  const chatHandler = async (e) => {
    setChat(!chat);
    setRefresh(!refresh);
    setUser(e);
  };

  return (
    <div className="main_nav_write_direct_site">
      <div className="main_nav_write_direct_site_top">
        <h3>Message</h3>
        <div className="main_nav_write_direct_site_top_icons">
          <TbMessageCirclePlus
            onClick={newChatHandler}
            className="main_nav_write_direct_site_top_icon"
          />
          {message ? (
            <MdOutlineKeyboardDoubleArrowDown
              onClick={messageHandler}
              className="main_nav_write_direct_site_top_icon"
            />
          ) : (
            <MdOutlineKeyboardDoubleArrowUp
              onClick={messageHandler}
              className="main_nav_write_direct_site_top_icon"
            />
          )}
        </div>
      </div>
      <div
        className={` ${
          message
            ? "main_nav_write_direct_site_midd_on"
            : "main_nav_write_direct_site_midd_off"
        } main_nav_write_direct_site_midd`}
      >
        {load ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading color="#1da1f2" width="30px" />{" "}
          </div>
        ) : (
          <>
            {chat ? (
              <MessagePageSite chatHandler={chatHandler} user={user} />
            ) : (
              <>
                {messages?.map((message, index) => (
                  <PartOfMessageSite
                    key={index}
                    chatHandler={chatHandler}
                    id={message}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
      <div
        className={` ${
          sendNewMessage
            ? "main_nav_write_direct_site_midd_on"
            : "main_nav_write_direct_site_midd_off"
        } main_nav_write_direct_site_midd`}
      >
        {load ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading color="#1da1f2" width="30px" />
          </div>
        ) : (
          <>
            {showUsersForMessage ? (
              <MessagePageSite chatHandler={newMessageHandler} user={user} />
            ) : (
              <>
                {followings?.map((message,index) => (
                  <PartOfMessageSite
                    chatHandler={newMessageHandler}
                    id={message}
                    mySelf={mySelf}
                    key={index}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MessageSite;
