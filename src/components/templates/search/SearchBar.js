"use client";
import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import { CiSearch } from "react-icons/ci";
import { BsXCircleFill } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBottom from "../mainSide/NavBottom";

function searchBar({ users }) {
  const [userSearch, setUserSearch] = useState([]);
  const [recent, setRescent] = useState([]);
  const [search, setSearch] = useState("");
  const route = useRouter();

  useEffect(() => {
    const userS = [];
    if (search.length > 0) {
      setRescent(true);
      users.map((user) => {
        if (user.username.includes(search)) {
          userS.push(user);
        } else {
          userS.filter((item) => item._id !== user._id);
        }
      });
      setUserSearch(userS);
    } else {
      setUserSearch([]);
      setRescent(true);
    }

    //localset
    const local = JSON.parse(localStorage.getItem("searchLocal")) || [];
    setRescent(local);
  }, [search]);

  const localHandler = (user) => {
    const local = JSON.parse(localStorage.getItem("searchLocal")) || [];
    setRescent(local);
    const find = local.find((item) => item._id === user._id);
    if (find) {
      return true;
    } else {
      if (local.length >= 2) {
        local.shift();
        local.push(user);

        localStorage.setItem("searchLocal", JSON.stringify(local));
      } else {
        local.push(user);
        localStorage.setItem("searchLocal", JSON.stringify(local));
      }
    }
  };

  const keySearchHandler = (e) => {
    if (e.keyDown === 13) {
      route.push(`/search/tweets?q=${search}`);
    }
  };
  const routeHandler = () => {
    route.push(`/search/tweets?q=${search}`);
  };

  return (
    <div className="searchbar">
      <div className="searchbar_top">
        <div className="searchbar_top_search">
          <CiSearch
            onClick={routeHandler}
            className="searchbar_top_search_icon"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search username or tweet"
            type="text"
            onKeyUp={(e) => keySearchHandler(e)}
          />
        </div>
        <a onClick={() => setSearch("")}>Cancel</a>
      </div>

      {recent.length > 0 && search.length == 0 && (
        <div className="searchbar_recent">
          <div className="searchbar_recent_top">
            Recent searchs
            <BsXCircleFill
              onClick={() => {
                localStorage.setItem(
                  "searchLocal",
                  JSON.stringify([]),
                  setRescent([])
                );
              }}
              className="searchbar_recent_top_icon"
            />
          </div>
          <div className="searchbar_recent_users">
            {recent.map((item,index) => (
              <Link
                href={`/profile/${item._id}`}
                className="searchbar_recent_users_box"
                key={index}
              >
                <img src={item.img} alt="" />
                <h6>{item.name}</h6>
                <span>@{item.username}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="searchbar_users">
        {userSearch.map((user,index) => (
          <Link
            onClick={(e) => localHandler(user)}
            href={`/profile/${user._id}`}
            // href=""
            className="searchbar_user"
            key={index}
          >
            <img src={user.img} alt="" />
            <div className="searchbar_user_info">
              <h6>{user.name}</h6>
              <span>@{user.username}</span>
            </div>
          </Link>
        ))}
      </div>
      <NavBottom />
    </div>
  );
}

export default searchBar;
