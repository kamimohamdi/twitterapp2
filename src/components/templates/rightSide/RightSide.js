import React from "react";
import "./rightside.css";
import { GrSearch } from "react-icons/gr";

function RightSide() {
  return (
    <div className="container_rightside">
      <div className="right_side_all">
        <div className="rightside_serach">
          <img src="./images/Search/Default.png" alt="" />
          <input type="text" placeholder="Search Twitter" />
        </div>
        <div className="rightside_news">
          <h3>What’s happening</h3>
          <div className="rightside_news_part">
            <div className="rightside_news_part_title">
              <div className="rightside_news_part_title_top">
                <span>Covid 19</span>
                <span>Last night</span>
              </div>
              <p className="rightside_news_part_title_text">
                Title lasdh asldh lsad sladj aslkd laksjdklasj djas lkdjas ldkja
                slkdj aslkdasl dlkasdlads
              </p>
              <div className="rightside_news_part_title_bottom">
                <span>Trending with</span>
                <span>#hashtag</span>
              </div>
            </div>
            <img src="./images/Placeholder.png" alt="" />
          </div>
          <div className="rightside_news_part">
            <div className="rightside_news_part_title">
              <div className="rightside_news_part_title_top">
                <span>Covid 19</span>
                <span>Last night</span>
              </div>
              <p className="rightside_news_part_title_text">
                Title lasdh asldh lsad sladj aslkd laksjdklasj djas lkdjas ldkja
                slkdj aslkdasl dlkasdlads
              </p>
              <div className="rightside_news_part_title_bottom">
                <span>Trending with</span>
                <span>#hashtag</span>
              </div>
            </div>
            <img src="./images/Placeholder.png" alt="" />
          </div>
          <span className="rightside_news_bottom">Show more</span>
        </div>
        <div className="rightside_news">
          <h3>Who to fllow</h3>
          <div className="rightside_follow">
            <div className="rightside_flow_left">
              <img src="./images/Avatar/Profile Picture2.png" alt="" />
              <div className="rightside_follow_info">
                <h4>amir</h4>
                <span>@amirmuhamdi</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="rightside_follow">
            <div className="rightside_flow_left">
              <img src="./images/Avatar/Profile Picture2.png" alt="" />
              <div className="rightside_follow_info">
                <h4>amir</h4>
                <span>@amirmuhamdi</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <a className="rightside_news_bottom rightside_follow_bottom">
            Show more
          </a>
        </div>
        <span className="rightside_bottom">
          Terms of Service Privacy Policy Cookie Policy Ads info More © 2021
          Twitter, Inc.
        </span>
      </div>
    </div>
  );
}

export default RightSide;
