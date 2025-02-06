import React from "react";
import { FaPen } from "react-icons/fa";
import "./NoteWrite.css";

function NoteWrite({ tweetHandler }) {
  return (
    <div className="main_nav_write" onClick={tweetHandler}>
      <FaPen className="main_nav_write_icon" />
    </div>
  );
}

export default NoteWrite;
