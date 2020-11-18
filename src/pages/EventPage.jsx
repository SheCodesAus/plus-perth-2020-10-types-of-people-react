import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AddToCalendar from "react-add-to-calendar";
import MentorRegisterForm from "../components/MentorRegisterForm/MentorRegisterForm";
import MentorAttendedPage from "./MentorAttendedPage";
// import { Button } from "react-bootstrap";
import retrieveIcons from "../utilities/retrieveIcons.js";
import logo from "../Spinner.svg";

const EventPage = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState({ responses: [] });
  const [isBusy, setBusy] = useState(true);
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const [userData, setUserData] = useState({});
  let username = window.localStorage.getItem("username");

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setUserData(data);
        // setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  const fetchEvent = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}events/${id}/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setEventData(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  useEffect(() => {
    fetchUser();
    fetchEvent();
  }, []);

  const generateCalendar = (eventData) => {
    const event = {
      title: eventData.event_name,
      description: eventData.event_description,
      location: eventData.event_location,
      startTime: eventData.event_datetime_start,
      endTime: eventData.event_datetime_end,
    };
    return <AddToCalendar event={event} />;
  };

  function IsOwnerCanEdit() {
    // if (username != null && eventData.organiser != null) {
    if (username === eventData.organiser) {
      return (
        <div id="owner-links">
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

  function FormatDate(date) {
    var date = new Date(date);
    var options = {
      year: "numeric",
      month: "numeric",
      //   month: "long",
      //   weekday: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      //   second: "numeric",
      //   timeZone: "Australia/Perth",
      //   timeZoneName: "short",
    };
    var formattedDate = new Intl.DateTimeFormat("en-AU", options).format(date);
    return formattedDate;
  }

  function ShowRegistrations() {
    if (username === eventData.organiser) {
      return (
        <div>
          <h3>Registrations: </h3>
          {eventData.responses.length === 0 ? (
            <p>There are currently no registrations for this event</p>
          ) : (
            <div>
              <ul>
                {eventData.responses.map((responseData, key) => {
                  return (
                    <li key={responseData.id}>
                      {responseData.mentor} registered on{" "}
                      {FormatDate(responseData.date_registered)}
                    </li>
                  );
                })}
              </ul>
              {/* Do we want all to see number of registrations or only the organiser? */}
              {/* <h3>Current registrations:</h3> */}
              {/* count the number of registrations  in the backend?*/}
            </div>
          )}
        </div>
      );
    } else {
      return "";
    }
  }

  const event_is_open = () => {
    const today = new Date();
    const event_date = new Date(eventData.event_datetime_start);
    if (event_date - today >= 0) {
      //first date is in future, or it is today
      // return false;
      return (eventData.is_open = true);
    }
    // return true;
    return (eventData.is_open = false);
  };

  function Status() {
    if (eventData.is_open) {
      return "Open";
    } else {
      return "Closed";
    }
    // elif {
    //   console.error("No is_open defined");
    // }
  }

  function MentorRegister() {
    if (userData.is_org) {
      // return <p>Only mentors can register to mentor at events </p>;
    } else {
      return (
        <MentorRegisterForm eventData={eventData} username={username} id={id} />
      );
    }
  }

  return (
    <>
      {isBusy ? (
        <img id="spinner-img" src={logo} alt="loading..." />
      ) : (
        <div id="event-page" className="container">
          <IsOwnerCanEdit />
          <h1>{eventData.event_name}</h1>
          <h3>
            {FormatDate(eventData.event_datetime_start)} until{" "}
            {FormatDate(eventData.event_datetime_end)}
          </h3>
          <h3>{eventData.event_location}</h3>
          <h3>
            Hosted by{" "}
            <Link to={`/profile/${eventData.organiser}`}>
              {eventData.organiser}
            </Link>
          </h3>
          <div id="event-page-image">
            <img src={eventData.event_image} alt="event image" />
          </div>
          <div class="icons">
            {retrieveIcons(eventData.categories).map((icon) => (
              <>{icon}</>
            ))}
          </div>
          <div id="status">
            {event_is_open()}
            <h3>
              Status: <Status />
            </h3>
          </div>
          <div className="event-page-bio">
            <p>{eventData.event_description}</p>
          </div>
          <br></br>
          {generateCalendar(eventData)}
          {/* if logged in and not an org */}
          {!LoggedIn ? (
            <>
              <p>
                Login to register your interest to be a mentor at this event
              </p>
            </>
          ) : (
            <>
              {!event_is_open() ? (
                <>
                  <h4>Responses are closed for this event</h4>
                </>
              ) : (
                <>{MentorRegister()}</>
              )}
            </>
          )}
          {!event_is_open() && username === eventData.organiser ? (
            <Link className="navbar-menu-item" to={`/events/${id}/attended`}>
              Confirm Mentor Attendance
            </Link>
          ) : (
            ""
          )}
          <ShowRegistrations />
        </div>
      )}
    </>
  );
};

export default EventPage;
