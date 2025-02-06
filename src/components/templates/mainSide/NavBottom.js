"use client";
import React from "react";
import "./navbottom.css";
import { AiOutlineHome } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { LuMessageSquare } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function NavBottom() {
  const route = usePathname();
  return (
    <ul class="main_nav_bottom">
      <li>
        <Link href="/">
          <AiOutlineHome
            className={`main_nav_bottom_icon`}
            style={{ color: `${route === "/" ? "var(--twitter)" : ""}` }}
          />
        </Link>
      </li>
      <li>
        <Link href="/search">
          <RiSearch2Line
            className={`main_nav_bottom_icon`}
            style={{ color: `${route === "/search" ? "var(--twitter)" : ""}` }}
          />
        </Link>
      </li>
      <li>
        <Link href="/notification">
          <IoMdNotificationsOutline
            className={`main_nav_bottom_icon`}
            style={{
              color: `${route === "/notification" ? "var(--twitter)" : ""}`,
            }}
          />
        </Link>
      </li>
      <li>
        <Link href="/message">
          <LuMessageSquare
            className={`main_nav_bottom_icon`}
            style={{ color: `${route === "/message" ? "var(--twitter)" : ""}` }}
          />
        </Link>
      </li>
    </ul>
  );
}

export default NavBottom;
