import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AddToCalendar from "react-add-to-calendar";
import MentorRegisterForm from "../components/MentorRegisterForm/MentorRegisterForm";

import MentorAttendedPage from "./MentorAttendedPage";
import { Button } from "react-bootstrap";
import retrieveIcons from "../utilities/retrieveIcons.js";

const EventPage = () => {
    const { id } = useParams();
    const [eventData, setEventData] = useState({ responses: [] });
    const [isBusy, setBusy] = useState(true);
    const [LoggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    const [userData, setUserData] = useState({});
    let username = window.localStorage.getItem("username");
    const icon = retrieveIcon(eventData.category);

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

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        token != null ? setLoggedIn(true) : setLoggedIn(false);
    }, [location]);

    const fetchEvent = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}events/${id}/`
        );
        if (response.ok) {
            // console.log(response);
            const data = await response.json();
            if (data) {
                setEventData(data);
                // console.log(data);
                setBusy(false);
            }
            return;
        }
        const data = await response.json();
    };

    useEffect(() => {
        fetchUser();
        fetchEvent();
    }, []);

    const generateCalendar = (eventData) => {
        const event = {
            title: eventData.event_name,
            description: eventData.event_description,
            location: eventData.description,
            startTime: eventData.event_start,
            endTime: eventData.event_end,
        };

        return <AddToCalendar event={event} />;
    };

    function IsOwnerCanEdit() {
        // if (username != null && eventData.organiser != null) {
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

    function ShowRegistrations() {
        if (username === eventData.organiser) {
            return (
                <div id="owner-links">
                    {eventData.responses && (
                        <div>
                            <h3>Recent Registrations: </h3>
                            <ul>
                                {eventData.responses.map((pledgeData, key) => {
                                    return (
                                        <li key={pledgeData.id}>
                                            {pledgeData.mentor} registered on{" "}
                                            {Date(pledgeData.date_registered)}
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
            return <p></p>;
        }
    }

    const event_is_open = () => {
        const today = new Date();
        const event_date = new Date(eventData.event_datetime_start);
        console.log(eventData.event_datetime_start);
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
            return <p>Open</p>;
        } else {
            return <p>Closed</p>;
        }
        // elif {
        //   console.error("No is_open defined");
        // }
    }

    function MentorRegister() {
        if (userData.is_org) {
            // return <p>Only mentors can register to mentor at events </p>;
        } else {
            return <MentorRegisterForm id={id} />;
        }
    }


  return (
    <>
      {isBusy ? (
        <p>loading</p>
      ) : (
        <div id="event-page" className="container">
          <IsOwnerCanEdit />
          <h1>{eventData.event_name}</h1>
          <h3>{Date(eventData.event_datetime_start)}</h3>
          <h3>Hosted by {eventData.organiser}</h3>
          <div id="event-page-image">
            <img src={eventData.event_image} alt="event image" />
          </div>
          {retrieveIcons(eventData.categories).map((icon) => (
            <>{icon}</>
          ))}
          <div id="status">
            <h3>Status: </h3>
            <h3>
              {event_is_open()}
              <Status />
            </h3>
          </div>
          <p>{eventData.event_description}</p>
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
                <>
                  {/* <MentorRegisterForm id={id} /> */}
                  {MentorRegister()}
                </>
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
