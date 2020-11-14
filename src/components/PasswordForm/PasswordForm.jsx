import React, { useState } from "react";

const PasswordForm = ({ onPasswordSubmit }) => {
  // State
  const [formDetails, setFormDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Actions
  const onSubmit = (event) => {
    event.preventDefault();
    if (formDetails.currentPassword === formDetails.newPassword) {
      alert("New password can not be the same as the current one");
      return;
    }
    if (formDetails.confirmNewPassword !== formDetails.newPassword) {
      alert("Make sure new password and confirmed match");
      return;
    }
    onPasswordSubmit(formDetails, () => {
      setFormDetails({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    });
  };

  const onChange = (event) => {
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="currentPassword">Current Password</label>
      <input
        name="currentPassword"
        value={formDetails.currentPassword}
        onChange={onChange}
      />
      <label htmlFor="newPassword">New Password</label>
      <input
        name="newPassword"
        value={formDetails.newPassword}
        onChange={onChange}
      />
      <label htmlFor="confirmNewPassword">Confirm New Password</label>
      <input
        name="confirmNewPassword"
        value={formDetails.confirmNewPassword}
        onChange={onChange}
      />
      <button type="submit" name="update-password-button">
        Submit
      </button>
    </form>
  );
};

export default PasswordForm;
