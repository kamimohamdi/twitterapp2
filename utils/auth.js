import swal from "sweetalert";

const { hash, compare } = require("bcryptjs");
const { verify, sign } = require("jsonwebtoken");

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashPassword) => {
  const validPass = await compare(password, hashPassword);
  return validPass;
};

const createToken = async (data) => {
  const token = sign({ data }, process.env.privateKey, { expiresIn: "24h" });

  return token;
};

const verifyToken = (token) => {
  try {
    const isValidToken = verify(token, process.env.privateKey);
    return isValidToken;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const sweeAlert = (title, icon, buttons) => {
  swal({ title, icon, buttons });
};

export { hashPassword, verifyPassword, createToken, verifyToken, sweeAlert };
