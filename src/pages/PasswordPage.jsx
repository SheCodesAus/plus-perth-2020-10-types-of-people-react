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
  // const onSubmit = async (passwordDetails, resetForm) => {
  //   try {
  //     console.log("--->", passwordDetails);
  //     const token = window.localStorage.getItem("token");
  //     console.log("token", token);
  //     const response = await fetch(
  //       `${process.env.REACT_APP_API_URL}users/${username}/update-password/`,
  //       // "https://binary-api.herokuapp.com/users/org/update-password/",
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Token ${token}`,
  //         },
  //         body: JSON.stringify({
  //           old_password: passwordDetails.currentPassword,
  //           new_password: passwordDetails.newPassword,
  //         }),
  //       }
  //     );
  //     // console.log(
  //     //   JSON.stringify({
  //     //     old_password: passwordDetails.currentPassword,
  //     //     new_password: passwordDetails.newPassword,
  //     //   })
  //     // );
  //     console.log("----1", response);
  //     if (response.ok) {
  //       alert("Password updated");
  //       resetForm();
  //     } else {
  //       console.log(response.json());
  //       alert("Could not update password");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     //   alert(`Network error: ${err.message}`);
  //   }
  // };
  // const onSubmit = async () => {
  //   let token = window.localStorage.getItem("token");
  //   const response = await fetch(
  //     `${process.env.REACT_APP_API_URL}users/${username}/update-password/`,
  //     {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`,
  //       },
  //       body: JSON.stringify(credentials),
  //     }
  //   );
  //   return response.json();
  // };

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
  // LoggedIn ? (
  //   <div id="signup-page" className="container">
  //     <>
  //       <h1>Update Password</h1>
  //       <PasswordForm Details={Details} />
  //     </>
  //   </div>
  // ) : (
  //   <Redirect to="/login" />
  // );
};
export default PasswordPage;
