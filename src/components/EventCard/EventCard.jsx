import React, { useState } from "react";
import { Link } from "react-router-dom";
import retrieveIcon from "../../utilities/retrieveIcon.js";
import "./EventCard.css";

const EventCard = (event) => {
  const icon = retrieveIcon(event.eventData.category);

  return (
    <Link to={`/events/${event.eventData.id}`}>
      <div id="event-card">
        <div id="event-card-image">
          <img
            src={event.eventData.event_image}
            alt={event.eventData.event_name}
          />
        </div>
        <div id="event-card-text">
          <h5>
            {event.eventData.event_date} | {event.eventData.event_name}
          </h5>
          <small>{event.eventData.organiser}</small>
          {icon}
          {event.eventData.category}
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
