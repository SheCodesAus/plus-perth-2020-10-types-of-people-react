import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard/EventCard";

const HomePage = () => {
  // DUMMY DATA
  const events = [
    {
      id: 1,
      event_name: "SheCodes Python Workshop",
      event_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
      event_image:
        "https://cdn.pixabay.com/photo/2015/01/08/18/24/programming-593312_960_720.jpg",
      event_location: "Riff",
      organiser: "She Codes",
      category: "Python",
      event_date: "Dec 12, 2019",
    },
    {
      id: 2,
      event_name: "SheCodes Junior JavaScript Workshop",
      event_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
      event_image:
        "https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg",
      event_location: "Flux",
      organiser: "She Codes",
      category: "JavaScript",
      event_date: "Mar 20, 2019",
    },
    {
      id: 3,
      event_name: "SheCodes One-Day Workshop",
      event_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
      event_image:
        "https://cdn.pixabay.com/photo/2017/01/12/10/40/school-1974369_960_720.jpg",
      event_location: "Riff",
      organiser: "She Codes",
      category: "Python",
      event_date: "Jan 9, 2019",
    },
  ];
  // FETCH MOST RECENT LIST AND CATEGORY LISTS HERE AND SET STATE BELOW
  const [mostRecent, setMostRecent] = useState(events);
  const [pythonEvents, setPythonEvents] = useState(events);
  const [javascriptEvents, setJavascriptEvents] = useState(events);
  const [htmlEvents, setHtmlEvents] = useState(events);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setEventList(data);
      });
  }, []);

  return (
    <div id="home-page" className="container">
      <header id="main-header">
        <div id="header-left">
          <h1 className="large-heading">
            FIND YOUR NEXT TECH MENTORING GIG TODAY
          </h1>
          <Link to="/signup">
            <button className="btn">Join Binary</button>
          </Link>
        </div>
        <div id="header-right">
          <div id="header-right-image">
            <img src={window.location.origin + "/mentor.png"}></img>
          </div>
        </div>
      </header>
      <section>
        <h2>What is Binary?</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, nihil aperiam optio sit quae, asperiores, recusandae
          ut laudantium natus corrupti similique accusantium animi eum tempore
          nobis eaque. Unde ipsum, odit omnis debitis qui placeat quos,
          reiciendis corporis exercitationem illo dicta, a quia excepturi
          nesciunt aliquam veniam voluptatem tempora ex incidunt.
        </p>
      </section>
      <section className="event-list-container">
        <h2>Most recent</h2>
        <div className="event-grid">
          {eventList.map((eventData, key) => {
            return <EventCard key={key} eventData={eventData} />;
          })}
        </div>
        <Link to="/">See all events</Link>
      </section>
      <section className="event-list-container">
        <h2>Python events</h2>
        <div className="event-grid">
          {events.map((event) => {
            return <EventCard event={event} />;
          })}
        </div>
        <Link to="/">See all Python events</Link>
      </section>
      <section className="event-list-container">
        <h2>JavaScript events</h2>
        <div className="event-grid">
          {/* {events.map((event) => {
              return <EventCard event={event} />;
            })} */}
        </div>
        <Link to="/">See all JavaScript events</Link>
      </section>
      <section className="event-list-container">
        <h2>HTML events</h2>
        <div className="event-grid">
          {/* {events.map((event) => {
              return <EventCard event={event} />;
            })} */}
        </div>
        <Link to="/">See all HTML events</Link>
      </section>
    </div>
  );
  // return <h2>What is Binary?</h2>;
};

export default HomePage;
