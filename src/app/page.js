import LeftSide from "@/components/templates/leftSide/LeftSide";
import MainSide from "@/components/templates/mainSide/MainSide";
import Profile from "@/components/templates/profile/Profile";
import RightSide from "@/components/templates/rightSide/RightSide";
import userModel from "@/models/User.js";
import "@/styles/global.css";
import { userAuth } from "@/utilsHelper";
import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "../../context/useContext";
import { redirect } from "next/navigation";
export default async function Home() {
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
        <LeftSide userInfo={userInfo} user={user} />
        <MainSide user={user} />
      </ContextProvider>
      <RightSide />
    </div>
  );
}
