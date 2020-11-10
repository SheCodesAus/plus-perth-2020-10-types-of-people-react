import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  return (
    <div id="login-page" className="container">
      {!LoggedIn ? (
        <>
          <h1>Log in</h1>
          <LoginForm />
        </>
      ) : (
        <>
          <p>You're already logged in as {username} </p>
        </>
      )}
    </div>
  );
};

export default LoginPage;
