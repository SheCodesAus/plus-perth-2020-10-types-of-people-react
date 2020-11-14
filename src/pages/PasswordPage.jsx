import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import PasswordForm from "../components/PasswordForm/PasswordForm";

const PasswordPage = () => {
  const [LoggedIn, setLoggedIn] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const onSubmit = async (passwordDetails, resetForm) => {
    try {
      console.log("--->", passwordDetails);
      const token = window.localStorage.getItem("token");
      console.log("token", token);
      const response = await fetch(
        "https://binary-api.herokuapp.com/users/admin/update-password/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token 15adefa28df56850aa806f090119480c6974a52d`,
          },
          data: JSON.stringify({
            old_password: passwordDetails.currentPassword,
            new_password: passwordDetails.newPassword,
          }),
        }
      );
      console.log("----1", response);
      if (response.ok) {
        alert("Password updated");
        resetForm();
      } else {
        console.log(response.json());
        alert("Could not update password");
      }
    } catch (err) {
      console.log(err);
      //   alert(`Network error: ${err.message}`);
    }
  };

  return LoggedIn ? (
    <div id="signup-page" className="container">
      <>
        <h1>Update Password</h1>
        <PasswordForm onPasswordSubmit={onSubmit} />
      </>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default PasswordPage;
