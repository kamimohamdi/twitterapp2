"use client";
import React from "react";
import ListRightPannel from "@/components/modules/ListRightPannel/ListRightPannel";
import { CiBarcode } from "react-icons/ci";
import { CgMoreO } from "react-icons/cg";
import { CiLight } from "react-icons/ci";
import Link from "next/link";
import "./leftside.css";

import { IconsMobile } from "@/utilsExSort";

function LeftSideMobile({ user, followers, followings }) {
  return (
    <div className="leftside_mobile">
      <div className="mobile_menu_top">
        <div className="leftside_mobile_top">
          <div className="leftside_mobile_top_left">
            <Link href="/myprofile">
              <img src={user?.img} alt="" />
            </Link>
            <h2>{user.name}</h2>
            <p>@{user.username}</p>
          </div>
          <div className="leftside_mobile_top_right">
            <CgMoreO />
          </div>
        </div>
        <div className="leftside_mobile_middle">
          <div className="leftside_mobile_follower">
            <div className="leftside_mobile_following">
              <span>{followings.length}</span>
              <p>Following</p>
            </div>
            <div className="leftside_mobile_followers">
              <span>{followers.length}</span>
              <p>Followers</p>
            </div>
          </div>
          <ul className="leftside_mobile_icons">
            {IconsMobile.map((icon, index) => (
              <ListRightPannel
                className="leftside_mobile_icon"
                icon={icon.icon}
                title={icon.title}
                link={icon.link}
                key={index}
              />
            ))}
          </ul>
          <div className="leftside_mobile_bottom_setting">
            <p>Settings and privacy</p>
            <p>Help Center</p>
          </div>
        </div>
      </div>

      <div className="leftside_mobile_bottom">
        <CiLight className="leftside_mobile_bottom_icon" />
        <CiBarcode className="leftside_mobile_bottom_icon" />
      </div>
    </div>
  );
}

export default LeftSideMobile;
