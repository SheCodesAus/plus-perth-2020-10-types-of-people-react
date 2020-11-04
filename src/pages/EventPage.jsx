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
  };

  var gapi = window.gapi
    var CLIENT_ID = "386459840730-gseilbtrjdhfd9fk1qmsg9nlkqefpova.apps.googleusercontent.com"
    var API_KEY = "AIzaSyBZb0EU63zw3l-gx-vb7ZjfKfp5zM6WRZY"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"
    
    // const AddToCalendar = () => {
    //     gapi.load('client:auth2', () => {
    //       console.log('loaded client')
    
    //       gapi.client.init({
    //         apiKey: API_KEY,
    //         clientId: CLIENT_ID,
    //         discoveryDocs: DISCOVERY_DOCS,
    //         scope: SCOPES,
    //       })
    
    //       gapi.client.load('calendar', 'v3')
    
    //       gapi.auth2.getAuthInstance().signIn()
    //       .then(() => {
            
    //         var event = {
    //           'summary': {event.event_name},
    //           'location': {event.event_location},
    //           'description': {event.event_description},
            
    //           'start': {
    //             'dateTime': {event.event_start},
    //             'timeZone': 'Australia/Perth'
    //           },
    //           'end': {
    //             'dateTime': {event.event_end},
    //             'timeZone': 'Australia/Perth',
    //           },
    //         }
            
    //         var request = gapi.client.calendar.events.insert({
    //           'calendarId': 'primary',
    //           'resource': event,
    //         })
    
    
    //         request.execute(event => {
    //           window.open(event.htmlLink)
    //         })
            
    
    //         gapi.client.calendar.events.list({
    //           'calendarId': 'primary',
    //           'timeMin': (new Date()).toISOString(),
    //           'showDeleted': false,
    //           'singleEvents': true,
    //           'maxResults': 5,
    //           'orderBy': 'startTime'
    //         }).then(response => {
    //           const events = response.result.items
    //         })    
    //       })
    //     })

    // };


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
