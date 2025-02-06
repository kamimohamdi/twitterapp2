import React from "react";
import "./loading.css";
function Loading({ color, width }) {
  return (
    <div
      className="loader"
      style={{ background: `${color}`, width: `${width ? width : "50px"}` }}
    ></div>
  );
}

export default Loading;
