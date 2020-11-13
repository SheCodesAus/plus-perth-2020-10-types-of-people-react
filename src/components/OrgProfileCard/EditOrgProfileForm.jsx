import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import Loader from "react-loader-spinner";

function EditProfileFrom(props) {
  const history = useHistory();
  const { orgDataProfile, userData } = props;
  console.log(props);

  let username = localStorage.username;
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
  });

  const [publicProfile, setPublicProfile] = useState({
    company_name: "",
    org_bio: "",
    contact_name: "",
    org_image: "",
  });

  useEffect(() => {
    setCredentials({
      username: userData.username,
      email: userData.email,
    });
    setPublicProfile({
      company_name:
        //undefined or null
        orgDataProfile === null ? " " : orgDataProfile.company_name,
      contact_name: orgDataProfile === null ? " " : orgDataProfile.contact_name,
      org_bio: orgDataProfile === null ? " " : orgDataProfile.org_bio,
      org_image: orgDataProfile === null ? " " : orgDataProfile.org_image,
    });
  }, [userData, orgDataProfile]);
  // console.log("profile", public_profile);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPublicProfile((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    let username = localStorage.username;

    const response1 = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/org/${username}/profile/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(publicProfile),
      }
    );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    if (credentials.username) {
      editData().then((response) => {
        // setBusy(false);
        console.log(response);
        // window.localStorage.setItem("username", credentials.username);
        history.push(`/profile/${username}`);
      });
    }
  };

  return (
    <form className="form">
      <div className="form-item">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="company_name">Company Name:</label>
        <input
          type="text"
          id="company_name"
          defaultValue={publicProfile.company_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="contact_name">Contact Name:</label>
        <input
          type="text"
          id="contact_name"
          defaultValue={publicProfile.contact_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="org_bio">Bio:</label>
        <input
          type="text"
          id="org_bio"
          defaultValue={publicProfile.org_bio}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="org_image">Image:</label>
        <input
          type="url"
          id="org_image"
          defaultValue={publicProfile.org_image}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div> */}
      <button className="btn" type="submit" onClick={handleSubmit}>
        Update Account
      </button>
    </form>
  );
}

export default EditProfileFrom;
