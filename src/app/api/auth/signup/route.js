import { writeFile } from "fs/promises";
import path from "path";
import userModel from "@/models/User.js";
import connectToDB from "@/configsdb";
import { verifyIdentifier, verifyValidPassword } from "@/utilspattern";
import { hashPassword, verifyPassword } from "@/utilsauth";

export async function POST(req) {
  try {
    connectToDB();
    const formData = await req.formData();
    const name = formData.get("name");
    const identifier = formData.get("identifier");
    const username = formData.get("username");
    const password = formData.get("password");
    const image = formData.get("img");

    if (
      !name.trim() ||
      !identifier.trim() ||
      !password.trim() ||
      !username.trim()
    ) {
      console.log("err 422");
      return Response.json({ message: "Empty Value !" }, { status: 422 });
    }

    const isUserExit = await userModel.findOne({
      $or: [{ identifier }, { username }],
    });

    if (isUserExit) {
      return Response.json(
        { message: "The Identifier Exit Before !" },
        { status: 423 }
      );
    }
    const verifyIdentifiers = verifyIdentifier(identifier);

    if (!verifyIdentifiers.valid) {
      return Response.json(
        { message: "Identifier Not Valid" },
        { status: 424 }
      );
    }

    const verifyPasswords = verifyValidPassword(password);

    if (!verifyPasswords) {
      return Response.json({ message: "Password Not Valid" }, { status: 425 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + image.name;
    const imgPath = path.join(process.cwd(), "public/usersProfile/" + filename);

    await writeFile(imgPath, buffer);

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      name,
      identifier,
      password: hashedPassword,
      img: `usersProfile/${filename}`,
      username,
      typeOfIdentifier: verifyIdentifiers.type,
    });
    return Response.json(user);
  } catch (err) {
    console.log(err);
    return Response.json({ message: err }, { status: 500 });
  }
}
