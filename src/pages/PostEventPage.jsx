import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard/EventCard";
import PostEventForm from "../components/PostEventForm/PostEventForm";

const PostEventPage = () => {
  // const [isOrg, setIsOrg] = useState(false);
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
        <p>loading</p>
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
