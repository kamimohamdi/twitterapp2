"use client";
import React from "react";
import LoadSite from "../LoadSite";
import "./loadmessage.css";


function LoadMessage() {
  return (
    <div className="load_messages">
      <span className="skeleton load_messages_top"></span>
      <span className="skeleton load_messages_search"></span>
      <LoadSite />
      <LoadSite />
    </div>
  );
}

export default LoadMessage;
