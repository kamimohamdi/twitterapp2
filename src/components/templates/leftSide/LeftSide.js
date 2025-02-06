"use client";
import React, { useEffect, useRef, useState } from "react";
import "./leftside.css";

import {
  ContextProvider,
  useStateContext,
} from "../../../../context/useContext";
import LeftSideSite from "./leftSideSite";
import LeftSideMobile from "./LeftSideMobile";

function LeftSide({ user, userInfo }) {
  const { profile } = useStateContext();
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    setFollowings(userInfo?.followings);
    setFollowers(userInfo?.followers);
  }, [userInfo]);

  const profileHandler = () => {};

  return (
    <div
      class={` ${profile ? "container_leftside_on" : ""} container_leftside`}
      onClick={profileHandler}
    >
      {profile ? (
        <LeftSideMobile
          followings={followings}
          followers={followers}
          user={user}
        />
      ) : (
        <></>
      )}
      <LeftSideSite user={user} />
    </div>
  );
}

export default LeftSide;
