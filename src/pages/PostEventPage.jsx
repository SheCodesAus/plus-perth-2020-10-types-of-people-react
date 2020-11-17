import React, { useState, useEffect } from "react";
import PostEventForm from "../components/PostEventForm/PostEventForm";
import logo from "../Spinner.svg";

const PostEventPage = () => {
  const [userData, setUserData] = useState();
  let user = localStorage.username;
  const [isBusy, setBusy] = useState(true);

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${user}/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setUserData(data);
        // console.log(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container">
      {isBusy ? (
        <img id="spinner-img" src={logo} alt="loading..." />
      ) : userData.is_org ? (
        <>
          <h1>Post an Event</h1>
          <PostEventForm />
        </>
      ) : (
        <p>Only Organisations can create events</p>
      )}
    </div>
  );
};

export default PostEventPage;
