"use client";
import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { BsCalendar2Date } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { LuMessageSquare } from "react-icons/lu";
import { MdMessage } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";

const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

import "react-toastify/dist/ReactToastify.css";
import MessagePageSite from "@/components/modules/Message/MessagePageSite";

function ProfileInfo({ user, pr, userId }) {
  const [follow, setFollow] = useState(false);

  const [followings, setFollowings] = useState(user.followings.length);
  const [followers, setFollowers] = useState(user.followers.length);

  const [chat, setChat] = useState(true);

  useEffect(() => {
    const isFollow = user.followers.filter(
      (item) => item.person === userId?._id
    );
    if (isFollow?.length > 0) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [user]);

  const followHandler = async () => {
    setFollow(!follow);
    if (follow) {
      const res = await fetch(`${siteURL}/api/user/following/${user._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId._id }),
      });
      if (res.status == 200) {
        toast("unFollow sucsessfuly ! ");
        setFollow(false);

        setFollowers((pre) => (pre = pre - 1));
      } else {
        toast("netWorks  Error ! ! ");
        setFollow(true);
      }
    } else {
      const res = await fetch(`${siteURL}/api/user/following/${user._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId._id }),
      });
      if (res.status == 200) {
        toast("Follow sucsessfuly ! ");
        setFollow(true);

        setFollowers((pre) => (pre = pre + 1));
      } else {
        setFollow(false);
      }
    }
  };

  const chatHandler = () => {
    setChat(!chat);
  };

  return (
    <>
      {chat ? (
        <div class="main_profile_info">
          <div class="main_profile_info_top">
            <img src={`${siteURL}/${user.img}`} alt="" />
            <div>
              {pr ? (
                <>
                  {follow ? (
                    <>
                      <button
                        className="main_profile_info_top_button"
                        onClick={followHandler}
                      >
                        following
                      </button>
                      <SiGooglemessages
                        onClick={chatHandler}
                        className="main_profile_info_top_icon"
                      />
                    </>
                  ) : (
                    <>
                      <button
                        className="main_profile_info_top_button"
                        onClick={followHandler}
                      >
                        follow
                      </button>
                      <SiGooglemessages
                        onClick={chatHandler}
                        className="main_profile_info_top_icon"
                      />
                    </>
                  )}
                </>
              ) : (
                <button className="main_profile_info_top_button">
                  Edit profile
                </button>
              )}
            </div>
          </div>
          <div class="main_profile_info_id">
            <h2>{user.name}</h2>
            <p>@{user.username}</p>
          </div>
          <div class="main_profile_info_informations">
            <p>{user.biography}</p>
            <div class="main_profile_info_information_location">
              {user.address && (
                <span>
                  <CiLocationOn class="main_profile_info_information_location_icon" />
                  {user.address}
                </span>
              )}
              <span>
                <BsCalendar2Date class="main_profile_info_information_location_icon" />
                {Date(user.createdAt).toString().slice(4, 7)}{" "}
                {Date(user.createdAt).toString().slice(11, 15)}
              </span>
            </div>
            <div class="main_profile_info_followers">
              <span>
                <a href="">{followings}</a>
                Following
              </span>
              <span>
                <a href="">{followers}</a>
                Followers
              </span>
            </div>
          </div>
        </div>
      ) : (
        chat && (
          <MessagePageSite
            mb={true}
            user={user._id}
            chatHandler={chatHandler}
          />
        )
      )}
    </>
  );
}

export default ProfileInfo;
