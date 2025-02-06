"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./follow.css";
import UserFollow from "./UserFollow";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;
import { usePathname } from "next/navigation";
import LoadSite from "../loading/LoadSite";
import { FaArrowLeft } from "react-icons/fa";

function Follow({ userInfo, user }) {
  const route = usePathname();
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [type, setType] = useState("followings");
  const [load, setLoad] = useState(true);
  const routeBack = useRouter();

  useEffect(() => {
    // setLoad(!load);
    typeHandler();
  }, [type]);

  const typeHandler = async () => {
    const userFwings = [];
    const userFwers = [];
    const res = await fetch(`${siteURL}/api/user/follower/${user}`);
    const data = await res.json();
    userFwings.push(data?.followings);
    userFwers.push(data?.followers);

    userFwings.sort((a, b) => a.time - b.time);
    userFwers.sort((a, b) => a.time - b.time);

    if (res.status == 200) {
      setLoad(false);
      setFollowers(userFwers);
      setFollowings(userFwings);
    }
  };

  const backHandler = () => {
    routeBack.back();
  };

  return (
    <div className="follow_action">
      <div className="follow_action_real">
        <div className="follow_action_top_back">
          <FaArrowLeft
            onClick={backHandler}
            className="follow_action_top_back_icon"
          />
        </div>
        <div className="follow_action_top">
          <a
            className={`follow_action_top_item_followings  follow_action_top_item ${
              type === "followings" ? "follow_action_top_item_on" : ""
            } `}
            onClick={() => setType("followings")}
          >
            Followings
          </a>
          <a
            className={`follow_action_top_item_followers follow_action_top_item ${
              type === "followers" ? "follow_action_top_item_on" : ""
            } `}
            onClick={() => setType("followers")}
          >
            Followers
          </a>
        </div>
        <div className="follow_action_users">
          {load ? (
            <>
              <LoadSite />
              <LoadSite />
              <LoadSite />
            </>
          ) : type === "followings" ? (
            followings[0]?.map((following) => (
              <UserFollow
                key={following.id}
                id={following.person}
                same={followers[0]}
                userId={user}
                typeHandler={typeHandler}
                type={type}
              />
            ))
          ) : (
            followers[0]?.map((follower) => (
              <UserFollow
                key={follower.id}
                id={follower.person}
                same={followings[0]}
                userId={user}
                typeHandler={typeHandler}
                type={type}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Follow;
