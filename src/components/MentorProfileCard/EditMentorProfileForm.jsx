import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function EditProfileFrom(props) {
  const history = useHistory();
  const { userData, userDataProfile } = props;

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
  });

  const [public_profile, SetPublic_profile] = useState({
    name: "",
    bio: "",
    skills: "",
  });

  useEffect(() => {
    setCredentials({
      username: userData.username,
      email: userData.email,
    });
    SetPublic_profile({
      bio: userDataProfile === null ? " " : userDataProfile.bio,
      name: userDataProfile === null ? " " : userDataProfile.name,
      skills: userDataProfile === null ? " " : userDataProfile.skills,
    });
  }, [userData, userDataProfile]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
    SetPublic_profile((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    let username = localStorage.username;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${userData.username}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    const response2 = await fetch(
      `${process.env.REACT_APP_API_URL}users/mentor/${username}/profile/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(public_profile),
      }
    );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    if (credentials.username) {
      editData().then((response) => {
        console.log(response);
        // window.localStorage.setItem("username", credentials.username);
        history.push(`profile/${userData.username}/`);
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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          defaultValue={public_profile.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="bio">Bio:</label>
        <input
          type="text"
          id="bio"
          defaultValue={public_profile.bio}
          onChange={handleChange}
        />
      </div>
      {/* <div className="form-item">
        <label htmlFor="skills">Skills:</label>
        <input
          type="text"
          id="categories"
          value={public_profile.skills}
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
