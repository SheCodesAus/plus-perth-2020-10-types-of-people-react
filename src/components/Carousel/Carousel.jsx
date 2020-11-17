import React from "react";
import EventCard from "../EventCard/EventCard";

const Carousel = ({ events }) => {
    return (
        <div className="event-grid">
            {events.map((event, key) => {
                return <EventCard key={key} eventData={event} />;
            })}
        </div>
    );
};

export default Carousel;
