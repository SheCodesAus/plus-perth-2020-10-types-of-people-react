import { useHistory } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "./MentorProfileCard.css";

function EditProfileFrom(props) {
  const history = useHistory();
  const { userData, mentorDataProfile } = props;
  let username = localStorage.username;
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setCategoryData(data);
      });
  }, []);

  const category_option = categoryData.map((category) => category.category);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
  });

  const [public_profile, SetPublic_profile] = useState({
    name: "",
    bio: "",
    skills: [],
    location: "",
  });

  useEffect(() => {
    setCredentials({
      username: userData.username,
      email: userData.email,
    });
    SetPublic_profile({
      bio: mentorDataProfile === null ? " " : mentorDataProfile.bio,
      name: mentorDataProfile === undefined ? " " : mentorDataProfile.name,
      skills: mentorDataProfile === null ? " " : mentorDataProfile.skills,
      // skills: mentorDataProfile.skills,
      location:
        mentorDataProfile === undefined ? " " : mentorDataProfile.location,
    });
  }, [userData, mentorDataProfile]);

  const updateCat = (newCat) => {
    SetPublic_profile({ ...public_profile, skills: newCat });
  };

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
        history.push(`/profile/${username}`);
      });
    }
  };

  return (
    <form className="form">
      {/* <div className="form-item">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div> */}
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
      <div className="form-item">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          defaultValue={public_profile.location}
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
      <div className="form-item">
        <Fragment>
          <div className="category-item-container">
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Skills</Form.Label>
              <Typeahead
                id="skills"
                labelKey="skills"
                // defaultValue={public_profile.skills}
                multiple
                onChange={updateCat}
                options={category_option}
                // placeholder="Choose categories..."
                selected={public_profile.skills}
              />
            </Form.Group>
          </div>
        </Fragment>
      </div>

      <button className="btn" type="submit" onClick={handleSubmit}>
        Update Account
      </button>
    </form>
  );
}

export default EditProfileFrom;
