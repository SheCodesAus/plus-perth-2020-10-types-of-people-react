import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import PasswordForm from "../components/PasswordForm/PasswordForm";

const PasswordPage = () => {
  const [LoggedIn, setLoggedIn] = useState(true);
  const location = useLocation();
  let username = window.localStorage.getItem("username");
  const [Details, setDetails] = useState({});

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const fetchPasswords = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/update-password/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setDetails(data);
      }
      return;
    }
    const data = await response.json();
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <div className="container">
      {LoggedIn ? (
        <>
          <h1>Update Password</h1>
          <PasswordForm Details={Details} />
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};
export default PasswordPage;
