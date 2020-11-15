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
  });

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
        } else {
          alert("Issue updating");
        }
      });
    }
  };

  return (
    <form className="form">
      <div className="form-item">
        <label htmlFor="old_password">Current Password</label>
        <input id="old_password" type="password" onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="new_password">New Password</label>
        <input id="new_password" type="password" onChange={handleChange} />
      </div>
      {/* placeholder for confirm new password validatoin */}
      {/* <div className="form-item">
        <label htmlFor="confirmNewPassword">Confirm New Password</label>
        <input type="password" onChange={handleChange} />
      </div> */}
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
