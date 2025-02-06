import React from "react";
import LoginForm from "./LoginForm";
import "./login.css";

function LoginPage() {
  return (
    <>
      <div className="loginpage_logo">
        <div className="container_logo">
          <h1>Welcom To The Twiiter</h1>
          <p>The Place For Speack</p>
          <img src="/images/Ilustração.png" alt="" />
          <span>© 2022 Twitter, Inc.</span>
        </div>
      </div>
      <LoginForm />
    </>
  );
}

export default LoginPage;
