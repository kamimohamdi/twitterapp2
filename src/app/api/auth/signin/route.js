import connectToDB from "@/configsdb";
import { createToken, verifyPassword } from "@/utilsauth";
import userModel from "@/models/User.js";
import { verifyIdentifier, verifyValidPassword } from "@/utilspattern";

export async function POST(req) {
  connectToDB();
  try {
    const { identifier, password } = await req.json();
    const isValidIdentifier = verifyIdentifier(identifier);
    const isValidPassword = verifyValidPassword(password);

    if (!identifier.trim() || !password.trim()) {
      return Response.json({ message: "Empty Value" }, { status: 420 });
    }
    if (!isValidIdentifier.valid || !isValidPassword) {
      return Response.json({ message: "not valid" }, { status: 421 });
    }

    const user = await userModel.findOne({ identifier: identifier });

    // verify password

    const verifyPass = verifyPassword(password, user.password);

    if (!verifyPass) {
      return Response.json(
        { message: "username or Password is Not Allow" },
        { status: 422 }
      );
    }

    const token = await createToken(user.identifier);
    const headers = new Headers();
    headers.append("Set-Cookie", `token=${token};path=/;httpOnly=true`);

 

    return Response.json({ message: "ok" }, { headers });
  } catch (err) {
    console.log("err sign in ---->", err);
    return Response.json({ message: err }, { status: 500 });
  }
}
