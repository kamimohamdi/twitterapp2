import connectToDB from "@/configs/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userModel from "@/models/User.js";
import { verifyPassword } from "@/utils/auth.js";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Next-Credentials",
      //   credentials: {
      //     username: {
      //       label: "Username",
      //       type: "text",
      //       placeholder: "Username ...",
      //     },
      //     password: {
      //       label: "Password",
      //       type: "password",
      //       placeholder: "Password ...",
      //     },
      //     email: {
      //       label: "Email",
      //       type: "email",
      //       placeholder: "Email ...",
      //     },
      //   },
      async authorize(credentials, req) {
        connectToDB();


        const { identifier, password, username } = credentials;

        if (!identifier.trim() || !password.trim()) {
          throw new Error("data is not valid1");
        }

        const user = await userModel.findOne({
          $or: [{ identifier }, { username }],
        });

        if (!user) {
          throw new Error("data is not valid2");
        }

        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
          throw new Error("data is not valid3");
        }

        return { email: user.identifier }; // Jwt Payload
      },
    }),
  ],
});

export { handler as GET, handler as POST };
