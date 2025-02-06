"use clinet";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../loading/Loading";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function UserFollow({ id, same, userId, typeHandler, type }) {
  const [user, setUser] = useState({});
  const [follow, setFollow] = useState(true);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const handler = async () => {
      const res = await fetch(`${siteURL}/api/user/follower/${id}`);
      const data = await res.json();
      setUser(data);
    };

    const handler2 = () => {
      const find = same.find((item) => item.person === id);
      console.log(`find of type : ${user.username} -->`, find);

      if (find) {
        setFollow(true);
      } else {
        setFollow(false);
      }
    };

    handler();
    handler2();
  }, [same]);

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
        typeHandler();
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
        setFollow(false);
        setLoad(false);
        typeHandler();
      } else {
        setFollow(true);
        setLoad(false);
        alert("err");
      }
    }
  };

  return (
    <div className="follow_action_user">
      <Link href="/" className="follow_action_user_image">
        <img src={`${siteURL}/${user?.img}`} alt="" />
      </Link>
      <div className="follow_action_user_informations">
        <Link href={"/"} className="follow_action_user_information_id">
          @{user.username}
        </Link>
        <Link href={"/"} className="follow_action_user_information_name">
          {user.name}
        </Link>
      </div>
      <div className="follow_action_user_follow">
        {follow ? (
          load ? (
            <button className="notification_middle_bar_button" disable>
              <div className="loading_styles">
                <Loading width="15px" color="var(--twitter)"></Loading>
              </div>
            </button>
          ) : (
            <button onClick={() => followHandler({ user: userId, person: id })}>
              <div className="loading_styles">Following</div>
            </button>
          )
        ) : load ? (
          <button disable>
            <div className="loading_styles">
              <Loading width="15px" color="var(--twitter)"></Loading>
            </div>
          </button>
        ) : (
          <button onClick={() => followHandler({ user: userId, person: id })}>
            <div className="loading_styles">Follow</div>
          </button>
        )}
      </div>
    </div>
  );
}

export default UserFollow;
