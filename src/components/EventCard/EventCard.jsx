import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import retrieveIcon from '../../utilities/retrieveIcon.js'
import './EventCard.css'

const EventCard = ({event}) => {
    const icon = retrieveIcon(event.category)

    return (
        <Link to={`/event/${event.id}`}>
            <div id="event-card">
                <div id="event-card-image">
                    <img src={event.event_image} alt={event.event_name}/>
                </div>
                <div id="event-card-text">
                    <h5>{event.event_date} | {event.event_name}</h5>
                    <small>{event.organiser}</small>
                    {icon}
                </div>
            </div>
        </Link>
        
    )
}

export default EventCard