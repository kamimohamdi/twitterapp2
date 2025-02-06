import React from "react";
import "./maincommentbottom.css";

function MainCommentBottom({ image, commentHandler }) {
  return (
    <div onClick={commentHandler} className="maincommentbutton">
      <img src={image} />
      <div className="maincommentbottom_replay">Tweet Your Replay</div>
    </div>
  );
}

export default MainCommentBottom;
