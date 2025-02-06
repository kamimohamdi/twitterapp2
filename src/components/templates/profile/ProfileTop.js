"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function ProfileTop({ length, name }) {
  const route = useRouter();
  const backHandler = () => {
    route.back();
  };
  return (
    <div class="main_profile_top">
      <span>
        <FaArrowLeft onClick={backHandler} className="main_profile_top_icon" />
      </span>
      <div>
        <h6>{name}</h6>
        <span>{length} Tweets</span>
      </div>
    </div>
  );
}

export default ProfileTop;
