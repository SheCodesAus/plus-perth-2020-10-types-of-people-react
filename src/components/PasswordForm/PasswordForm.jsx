// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const PasswordForm = (props) => {
  // State
  const { Details } = props;
  let username = window.localStorage.getItem("username");
  const history = useHistory();

  const [formDetails, setFormDetails] = useState({
    old_password: "",
    new_password: "",
    // confirmNewPassword: "",
  });
  // console.log(Details);
  const logout = () => {
    window.localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    setFormDetails({
      old_password: Details.old_password,
      new_password: Details.new_password,
    });
  }, [Details]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDetails((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/update-password/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formDetails),
      }
    );
    return response.json();
  };

  //   <Link className="navbar-menu-item" to="/" onClick={logout}>
  //   Logout
  // </Link>

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");

    if (formDetails.new_password && formDetails.old_password) {
      //   console.log("All data is there");
      editData().then((response) => {
        console.log(response);
        console.log(response.code);
        if (response.code === 200) {
          alert("Password updated successfully");
          {
            logout();
          }
          // history.push("/login");
        } else {
          alert("Issue updating");
          // alert("Password updated successfully. Login again");
          // {
          //   logout();
          // }
          // history.push("/login");
        }

        // // console.log("set local storage");
        // history.push(`/`);
      });
    }
    // alert("Current and new password need to be entered");
  };
  // Actions
  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   if (formDetails.currentPassword === formDetails.newPassword) {
  //     alert("New password can not be the same as the current one");
  //     return;
  //   }
  //   if (formDetails.confirmNewPassword !== formDetails.newPassword) {
  //     alert("Make sure new password and confirmed match");
  //     return;
  //   }
  //   onPasswordSubmit(formDetails, () => {
  //     setFormDetails({
  //       currentPassword: "",
  //       newPassword: "",
  //       confirmNewPassword: "",
  //     });
  //   });
  // };

  // const onChange = (event) => {
  //   setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  // };

  return (
    <form className="form">
      <div className="form-item">
        <label htmlFor="old_password">Current Password</label>
        <input
          id="old_password"
          type="password"
          // value={formDetails.old_password}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="new_password">New Password</label>
        <input
          id="new_password"
          type="password"
          // value={formDetails.new_password}
          onChange={handleChange}
        />
      </div>
      {/* <div className="form-item"></div> */}
      {/* <label htmlFor="confirmNewPassword">Confirm New Password</label>
      <input
        name="confirmNewPassword"
        value={formDetails.confirmNewPassword}
               onChange={handleChange}

      /> */}
      {/* </div> */}
      <button
        type="submit"
        // name="update-password-button"
        onClick={handleSubmit}
      >
        Update Password
      </button>
    </form>
  );
};

export default PasswordForm;
