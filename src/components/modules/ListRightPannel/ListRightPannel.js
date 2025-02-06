"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function ListRightPannel({ icon, title, link }) {
  const route = usePathname();
  console.log(route, "-", link);
  return (
    <li>
      <Link
        className={`${route === `/${link}` ? "leftside_top_menu_icon_on" : ""}`}
        href={`${link}`}
      >
        {icon}
        <span>{title}</span>
      </Link>
    </li>
  );
}

export default ListRightPannel;
