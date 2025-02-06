import MessageMobile from "@/components/modules/Message/MessageMobile";
import Test from "@/components/modules/Message/Test.js";
import LeftSide from "@/components/templates/leftSide/LeftSide";
import RightSide from "@/components/templates/rightSide/RightSide";
import { userAuth } from "@/utilsHelper";
import React from "react";
import { ContextProvider } from "../../../context/useContext";
import userModel from "@/models/User.js";
import LoadMessages from "@/components/modules/loading/loadingMessage/LoadMessage.js";

async function page() {
  const user = await userAuth();

  const messages = await userModel
    .findOne({ _id: user._id })
    .populate("messages")
    .populate("followings")
    .lean();

  return (
    <div className="container">
      <ContextProvider>
        <LeftSide user={user} />
      </ContextProvider>
      <MessageMobile messages={messages} user={user} />
      {/* <LoadMessages /> */}
    </div>
  );
}

export default page;
