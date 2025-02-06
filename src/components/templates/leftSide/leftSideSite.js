import React from "react";
import { FaTwitter } from "react-icons/fa";
import ListRightPannel from "@/components/modules/ListRightPannel/ListRightPannel";
import { IconsSite } from "@/utilsExSort";
import { IoIosMore } from "react-icons/io";
import Link from "next/link";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

function leftSideSite({ user }) {
  return (
    <div className="leftSideSite">
      <div class="leftside_top">
        <div class="leftside_top_logo">
          <FaTwitter className="leftside_top_logo_icon" />
        </div>

        <ul class="leftside_top_menu">
          {IconsSite.map((icon, index) => (
            <ListRightPannel
              icon={icon.icon}
              title={icon.title}
              link={icon.link}
              key={index}
            />
          ))}
        </ul>

        <button class="leftside_top_middle_button">Tweet</button>
      </div>
      <div class="leftside_bottom">
        <div class="leftside_info">
          <div class="leftside_info_profile">
            <Link href={`${siteURL}/myprofile`}>
              <img src={`${siteURL}/${user?.img}`} alt="" />
            </Link>

            <div class="leftside_info_profile_title">
              <span>{user.name}</span>
              <span>@{user.username}</span>
            </div>
          </div>
          <div class="leftside_info_icon">
            <IoIosMore className="leftside_info_icon_" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default leftSideSite;
