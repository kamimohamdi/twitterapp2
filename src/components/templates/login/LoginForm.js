"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import userModel from "@/models/User.js";
import connectToDB from "@/configsdb";

import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import {
  verifyIdentifier,
  verifyValidPassword,
  sweeAlert,
} from "@/utilspattern";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Loading from "@/components/modules/loading/Loading";
import { API } from "../../../../configsOf";

function LoginForm() {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState({});
  const route = useRouter();

  const loginHandler = (e) => {
    e.preventDefault();
    setLogin(!login);
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (
      !name.trim() ||
      !identifier.trim() ||
      !password.trim() ||
      !username.trim() ||
      !password2.trim()
    ) {
      return toast.warn("Your Information For SignUp Is Not Completed !");
    }

    // 2
    const validIdentifier = verifyIdentifier(identifier);
    if (!validIdentifier.valid) {
      return toast.warn(`Your Email or Number Is Not Valid !`);
    }

    // 2
    if (password !== password2) {
      return toast.warn(`Your Password Not Same To Geter  !`);
    }

    const validPassword = verifyValidPassword(password);
    if (!validPassword) {
      return toast.warn(`Your Password Not Valid  !`);
    }

    //
    var formData = new FormData();
    formData.set("name", name);
    formData.set("username", username);
    formData.set("identifier", identifier);
    formData.set("password", password);
    formData.append("img", image);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    if (res.status == 422) {
      toast.warn("Your Information For SignUp Is Not Completed !");
    } else if (res.status == 423) {
      toast.warn("This Number Or Username Or Email Exist Before !");
    } else if (res.status == 424) {
      toast.warn("Your Number Or Email Not Valid !");
    } else if (res.status == 425) {
      toast.warn("Your Password Is Not Valid");
    } else if (res.status == 200) {
      swal({
        title: "You Successfuly SignUp In Twitter !",
        icon: "success",
        buttons: "ok",
      }).then(location.reload());
    }
  };

  const signin = async (e) => {
    console.log(API);
    e.preventDefault();
    setLoading(true);
    if (!identifier.trim() || !password.trim()) {
      setLoading(false);
      return toast("Your Value Is Empty !");
    }
    const res = await fetch(`/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (res.status == 200) {
      setLoading(false);
      swal({
        title: "You Login Seccsessfuly !",
        icon: "success",
        buttons: "ok",
      }).then(route.replace("/"));
    } else {
      setLoading(false);
      toast("Your username or password Is not valid");
    }
  };

  return (
    <div className="loginpage_form">
      <ToastContainer position="top-center" />
      {login ? (
        <div className="container_login">
          <div className="login_top">
            <img src="./images/2021 Twitter logo - blue 1.png" alt="" />
            <span>
              You Did Have Page?{" "}
              <a onClick={loginHandler} href="">
                Create Accont
              </a>
            </span>
          </div>
          <h1>Login Page</h1>
          <form action="">
            <label for="">Enter Your Twitter Accont</label>
            <input
              type="text"
              placeholder="Enter Your Username or Email Or Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Your Password"
            />
            <a href="">Forget Your Password ?</a>
            {loading ? (
              <button disabled onClick={signin} className="login_button">
                <Loading color="white" />
              </button>
            ) : (
              <button onClick={signin} className="login_button">
                Login
              </button>
            )}
          </form>

          <span>OR</span>

          <div className="login_google">
            <a href="" className="login_google_google">
              <img src="./images/Google Logo.png" alt="" />
              Enter Your Google
            </a>
            <a href="" className="login_google_apple">
              <img src="./images/Logo Apple.png" alt="" />
              Enter Your Apple
            </a>
          </div>
        </div>
      ) : (
        <div className="loginpage_form">
          <div className="container_login">
            <div className="login_top">
              <img src="./images/2021 Twitter logo - blue 1.png" alt="" />
            </div>
            <form action="">
              <label for="">Sign In</label>
              <input
                type="text"
                placeholder="Enter Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Your  Email Or Number"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter Your Password Again"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <input
                type="file"
                placeholder="Enter Your Password"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <button className="login_button" onClick={signUp}>
                Sign In
              </button>
              <a style={{ marginTop: "1rem" }} onClick={loginHandler} href="">
                Back To Login
              </a>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
