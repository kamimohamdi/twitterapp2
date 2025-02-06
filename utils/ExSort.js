import { HiOutlineHashtag } from "react-icons/hi";
import { AiOutlineHome } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { LuMessageSquare } from "react-icons/lu";
import { RiFileList2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
const siteURL = process.env.NEXT_PUBLIC_SITE_URL;

const IconsMobile = [
  {
    title: "Home",
    icon: <AiOutlineHome className="leftside_top_menu_icon" />,
    link: `{${siteURL}}`,
  },
  {
    title: "Bookmarks",
    icon: <PiBookmarkSimpleBold className="leftside_top_menu_icon" />,
  },
  {
    title: "Followers",
    icon: <FaRegUser className="leftside_top_menu_icon" />,
    link: `${siteURL}/follower`,
  },
];

const IconsSite = [
  {
    title: "Home",
    icon: <AiOutlineHome className="leftside_top_menu_icon" />,
    link: "/",
  },
  {
    title: "Notification",
    icon: <RiFileList2Line className="leftside_top_menu_icon" />,
  },
  {
    title: "Message",
    icon: <LuMessageSquare className="leftside_top_menu_icon" />,
    link: "message",
  },
  {
    title: "Bookmarks",
    icon: <PiBookmarkSimpleBold className="leftside_top_menu_icon" />,
  },
  {
    title: "Follower",
    icon: <FaRegUser className="leftside_top_menu_icon" />,
    link: `${siteURL}/follower`,
  },
  {
    title: "MyProfile",
    icon: <CgProfile className="leftside_top_menu_icon" />,
    link: `${siteURL}/myprofile`,
  },
];

export { IconsMobile, IconsSite };
