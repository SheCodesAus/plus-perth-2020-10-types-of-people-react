import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignupForm from "../components/SignupForm/SignupForm";

const SignupPage = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  return (
    <div id="signup-page" className="container">
      {!LoggedIn ? (
        <>
          <h1>Create an Account</h1>
          <SignupForm />
        </>
      ) : (
        <>
          <p>You're already logged in as {username} </p>
        </>
      )}
    </div>
  );
};

export default SignupPage;
