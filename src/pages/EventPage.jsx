import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState();
  //   const [eventData, setEventData] = useState({ responses: [] });
  const [isBusy, setBusy] = useState(true);
  let username = localStorage.username;

  const fetchEvent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}events/${id}/`
    );
    if (response.ok) {
      console.log(response);
      const data = await response.json();

      if (data) {
        setEventData(data);
        console.log(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  useEffect(() => {
    fetchEvent();
  }, []);
  // console.log(id);

  function IsOwnerCanEdit() {
    username = window.localStorage.getItem("username");
    // if (username != null && projectData.owner != null) {
    if (username === eventData.organiser) {
      return (
        <div id="owner-links">
          {/* <p>username = owner</p> */}
          <Link to={`/events/${id}/edit`}>
            <p>Edit</p>
          </Link>
          <Link to={`/events/${id}/delete`}>
            <p>Delete</p>
          </Link>
        </div>
      );
    } else {
      return <p></p>;
      // return <p>username != owner</p>;
    }
    // }
  }

  return (
    <>
      {isBusy ? (
        <p>loading</p>
      ) : (
        <div id="event-page" className="container">
          <IsOwnerCanEdit />
          <h3>{eventData.event_date}</h3>
          <h1>{eventData.event_name}</h1>
          <h3>Hosted by {eventData.organiser}</h3>
          <div id="event-page-image">
            <img src={eventData.event_image} alt="event image" />
          </div>
          <p>{eventData.event_description}</p>
        </div>
      )}
    </>
  );
};

export default EventPage;
