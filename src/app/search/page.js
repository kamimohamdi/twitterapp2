import LeftSide from "@/components/templates/leftSide/LeftSide";
import RightSide from "@/components/templates/rightSide/RightSide";
import { userAuth } from "@/utilsHelper";
import React from "react";
import { ContextProvider } from "../../../context/useContext";
import SearchBar from "@/components/templates/search/SearchBar";
import userModel from "@/models/User.js";

async function page() {
  const user = await userAuth();

  const users = await userModel.find(
    {},
    "-__v -password -identifier -typeOfIdentifier -createdAt -updatedAt "
  );
  return (
    <div className="container">
      <ContextProvider>
        <LeftSide user={user} />
        <SearchBar users={users} />
      </ContextProvider>
      <RightSide />
    </div>
  );
}

export default page;
