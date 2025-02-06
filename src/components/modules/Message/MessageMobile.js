"use client";
import MainSide from "@/components/templates/mainSide/MainSide";
import MainTweetMobile from "@/components/templates/mainSide/MainTweetMobile";
import { IoSettingsOutline } from "react-icons/io5";
import NavBottom from "@/components/templates/mainSide/NavBottom";
import { GrSearch } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import "./MessageMobile.css";
import PartOfMessageSite from "./partOfMessageSite";
import MessagePageSite from "./MessagePageSite";
import LoadSite from "../loading/LoadSite";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function MessageMobile({ user, messages }) {
  const [message, setMessages] = useState([]);
  const [mySelf, setMySelf] = useState("");

  const [messagesUser, setMessageUser] = useState(true);
  const [userMessageId, setUserMessageId] = useState("");
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  const [load, setLoad] = useState(true);

  useEffect(() => {
    const handler = async () => {
      const res = await fetch(`${siteURL}/api/message/usersMessages`);
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
      const res = await fetch(`${siteURL}/api/message/getuserchat`);
      const data = await res.json();
      setMySelf(data._id);

      const users = [];
      data.filter((item) => {
        if (item.username.includes(search)) {
          users.push(item._id);
          setMessages(users);
        } else {
          users.filter((user) => user !== item._id);
          setMessages(users);
        }
      });
    };
    if (!search.length > 0) {
      setLoad(true);
      handler();
    } else {
      handler2();
    }
  }, [search]);

  useEffect(() => {
    if (search.length == 0) {
      const handler = async () => {
        const res = await fetch(`${siteURL}/api/message/usersMessages`);
        const data = await res.json();
        const users = [];
        data.messages.map((message) => users.push(message.person));

        const usersReal = users.filter(
          (item, index) => users.indexOf(item) === index
        );

        setMessages(usersReal);
      };

      handler();
    }

    setTimeout(() => setRefresh(!refresh), 1000);

    return () => clearTimeout();
  }, [refresh]);

  const chatHandler = (e) => {
    setMessageUser(!messagesUser);
    setUserMessageId(e);
  };
  return (
    <>
      <div className="container_direct">
        <div className="container_direct_top">
          <img src={user.img} alt="" />
          Message
          <span>
            <IoSettingsOutline className="container_direct_top_icon" />
          </span>
        </div>

        {messagesUser ? (
          load ? (
            <div
              className={`container_direct_bar ${
                messagesUser ? "" : "container_direct_bar_off"
              }   `}
              style={{ marginTop: "50px" }}
            >
              <LoadSite />
              <LoadSite />
              <LoadSite />
            </div>
          ) : (
            <div
              className={`container_direct_bar ${
                messagesUser ? "" : "container_direct_bar_off"
              }   `}
            >
              <div className="container_direct_serach">
                <GrSearch className="container_direct_serach_icon" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="serach for send message !"
                />
              </div>

              {
                <div className="container_direct_messages">
                  {message?.map((item, index) => (
                    <PartOfMessageSite
                      key={index}
                      id={item}
                      chatHandler={chatHandler}
                      mySelf={mySelf}
                    />
                  ))}
                </div>
              }
            </div>
          )
        ) : (
          <MessagePageSite
            mb={true}
            user={userMessageId}
            chatHandler={chatHandler}
          />
        )}
      </div>
      <NavBottom />
    </>
  );
}

export default MessageMobile;
