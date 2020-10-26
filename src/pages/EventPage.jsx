import React from "react";

// Replace with fetch data
const event = {
    id: 1,
    event_name: "SheCodes Python Workshop",
    event_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
    event_image: "https://cdn.pixabay.com/photo/2015/01/08/18/24/programming-593312_960_720.jpg",
    event_location: "Riff",
    organiser: "She Codes",
    category: "Python",
    event_date: "Dec 12, 2019"
};

const EventPage = () => {
    return (
        <div id="event-page" className="container">
            <h3>{event.event_date}</h3>
            <h1>{event.event_name}</h1>
            <h3>Hosted by {event.organiser}</h3>
            <div id="event-page-image">
                <img src={event.event_image} alt="event image for SheCodes"/>
            </div>
            <p>{event.event_description}</p>
        </div>
    );
};

export default EventPage;
