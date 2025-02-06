"use client";
import React, { useState, useEffect, useRef } from "react";
import "./MessageSite.css";
import { IoMdSend } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../loading/Loading";
import PartOfMessage from "./PartOfMessage";
import LoadMessageChat from "../loading/loadingMessage/LoadMessageChat";

function MessagePageSite({ chatHandler, user, mb }) {
  const [info, setInfo] = useState({});
  const [mySelf, setMySelf] = useState("");
  const [chats, setChats] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [body, setBody] = useState("");
  const [loadSendChat, setLoadSendChat] = useState(false);
  const [loadChat, setLoadChat] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView();
    }, 1000);

    return () => clearTimeout();
  }, [mb]);

  useEffect(() => {
    const handler = async () => {
      const res = await fetch(`api/user/getmessageuser/${user}`);
      const data = await res.json();
      setInfo(data);
    };
    const handler2 = async () => {
      const res = await fetch("api/message");
      const data = await res.json();
      setMySelf(data);
      const chat = data.messages.filter(
        (item) => item.person === user || item.user === user
      );
      chat.sort((a, b) => a.time - b.time);
      if (loadChat) {
        setLoadChat(false);
      }
      setChats((pre) => {
        if (pre.length < chat.length) {
          setTimeout(() => {
            bottomRef.current?.scrollIntoView();
          }, 1000);
          return chat;
        } else {
          return chat;
        }
      });
    };

    handler();
    handler2();

    setTimeout(() => setRefresh(!refresh), 1000);

    return () => clearTimeout();
  }, [refresh]);

  const chatSendHandler = async () => {
    setLoadSendChat(true);
    const res = await fetch(`api/message/${info._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body, userId: mySelf._id }),
    });
    if (res.status == 200) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView();
      }, 1000);

      setBody("");
      setRefresh(!refresh);
      setLoadSendChat(false);
    } else {
      toast.warn("Network's Error ");
      setLoadSendChat(false);
    }
  };

  return (
    <>
      <ToastContainer posission="top-center" onSee />
      <div className="messagepagesite">
        <div
          className={`messagepagesite_top ${
            mb ? "messagepagesite_top_mobile" : ""
          } `}
        >
          <IoIosArrowBack
            onClick={chatHandler}
            className="messagepagesite_bottom_icon_back"
          />
          <img src={info?.img} alt="" />
          <span>{info?.name}</span>
        </div>
        <div
          className={`messagepagesite_chat ${
            mb ? "messagepagesite_chat_mobile" : ""
          } `}
        >
          {loadChat ? (
            <LoadMessageChat />
          ) : (
            chats.map((chat) => (
              <>
                <PartOfMessage key={chat._id} chat={chat} _id={mySelf._id} />
                <div ref={bottomRef}></div>
              </>
            ))
          )}
          {/* {} */}
        </div>
        <div
          className={`messagepagesite_bottom ${
            mb ? "messagepagesite_bottom_mobile" : ""
          } `}
        >
          <button onClick={chatSendHandler}>
            {loadSendChat ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Loading color="white" width="15px" />
              </div>
            ) : (
              <>
                send
                <IoMdSend className="messagepagesite_bottom_icon" />
              </>
            )}
          </button>
          <input
            onChange={(e) => setBody(e.target.value)}
            value={body}
            type="text"
            placeholder="write somthings ..."
          />
        </div>
      </div>
    </>
  );
}

export default MessagePageSite;
