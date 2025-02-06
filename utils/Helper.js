const { default: connectToDB } = require("@/configs/db.js");
import userModel from "@/models/User";
import { cookies } from "next/headers";
import { verifyToken } from "./auth";

const userAuth = async () => {
  const token = cookies().get("token");
  const userEmail = verifyToken(token?.value);

  connectToDB();
  const user = await userModel.findOne(
    { identifier: userEmail.data },
    "-password -__v -typeOfIdentifier"
  );

  return user;
};

export { userAuth };
