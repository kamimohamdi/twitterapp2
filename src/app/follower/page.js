import LeftSide from "@/components/templates/leftSide/LeftSide";
import RightSide from "@/components/templates/rightSide/RightSide";
import { userAuth } from "@/utilsHelper";
import React from "react";
import { ContextProvider } from "../../../context/useContext";
import { redirect } from "next/navigation";
import userModel from "@/models/User.js";
import Follow from "@/components/modules/Follow/Follow";

async function page() {
  const user = await userAuth();

  if (!user) {
    redirect("/login");
  }

  const userInfo = await userModel
    .findOne({ _id: user._id })
    .populate("followings")
    .populate("followers")
    .lean();

  return (
    <div className="container">
      <ContextProvider>
        <LeftSide user={user} userInfo={userInfo} />
      </ContextProvider>
      <Follow type="followings" userInfo={userInfo} user={user._id} />
      <RightSide />
    </div>
  );
}

export default page;
