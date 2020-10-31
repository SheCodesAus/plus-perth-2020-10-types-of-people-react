import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SignupForm = () => {
  // function SignupForm() {
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    is_org: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/register/`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (credentials.title != null) {
    if (credentials.username && credentials.password) {
      postData().then((response) => {
        console.log(response);
        window.localStorage.setItem("username", credentials.username);
        console.log("username:", credentials.username);
        history.push("/login");
      });
    }
    // }
  };

  return (
    <form className="form">
      <div className="form-item">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          //   placeholder="Enter a unique username"
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          //   placeholder="Enter a valid email"
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          //   placeholder="Enter a password"
          onChange={handleChange}
        />
      </div>
      {/* <div className="form-item">
        <label htmlFor="password">Confirm password</label>
        <input type="password" onChange={handleChange} />
      </div> */}
      <div className="form-item">
        <label htmlFor="is_org">Organisation?</label>
        <input type="checkbox" id="is_org" onChange={handleChange} />
      </div>
      <button className="btn" type="submit" onClick={handleSubmit}>
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;
