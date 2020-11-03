import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteEvent from "../components/DeleteEventForm";

function DeleteEventPage() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = localStorage.username;
  //   username = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const [eventData, setEventData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/${id}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setEventData(data);
      });
  }, []);

  return (
    <div>
      {!LoggedIn ? (
        <>
          <p>Login to edit a project </p>
        </>
      ) : (
        <>
          <p>Logged in as {username} </p>
          <br></br>
          <DeleteEvent />
        </>
      )}
    </div>
  );
}

export default DeleteEventPage;
