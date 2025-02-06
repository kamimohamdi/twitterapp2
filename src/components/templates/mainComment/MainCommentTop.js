import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function MainCommentTop() {
  return (
    <div className="maincomment_top">
      <Link href="/">
        <FaArrowLeft className="main_profile_top_icon" />
      </Link>
      <h5>
        Tweet
      </h5>
    </div>
  )
}

export default MainCommentTop