import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import EventCard from "../components/EventCard/EventCard";

const HomePage = () => {
    const [mostRecent, setMostRecent] = useState([]);
    const [pythonEvents, setPythonEvents] = useState([]);
    const [javascriptEvents, setJavascriptEvents] = useState([]);
    const [htmlEvents, setHtmlEvents] = useState([]);
    const [cssEvents, setCssEvents] = useState([]);
    const [reactEvents, setReactEvents] = useState([]);

    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch method for all endpoints
    const fetchEvents = (endpoint, setterFunction) => {
        fetch(`${process.env.REACT_APP_API_URL}${endpoint}`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setterFunction(data);
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const token = window.localStorage.getItem("token");
        token != null ? setLoggedIn(true) : setLoggedIn(false);

        // Fetch all shortlists
        fetchEvents("events/most-popular/short-list/", setMostRecent);
        fetchEvents("events/categories/HTML/events/short-list/", setHtmlEvents);
        fetchEvents("events/categories/CSS/events/short-list/", setCssEvents);
        fetchEvents(
            "events/categories/JavaScript/events/short-list/",
            setJavascriptEvents
        );
        fetchEvents(
            "events/categories/Python/events/short-list/",
            setPythonEvents
        );
        fetchEvents(
            "events/categories/React/events/short-list/",
            setReactEvents
        );

        setLoading(false);
    }, []);

    if (loading) {
        // replace this with a loader component
        return <p>loading...</p>;
    } else {
        return (
            <div id="home-page" className="container">
                <header id="main-header">
                    <div id="header-left">
                        <h1 className="large-heading">
                            FIND YOUR NEXT TECH MENTORING GIG TODAY
                        </h1>
                        {!loggedIn ? (
                            <>
                                <Link to="/signup">
                                    <button className="btn">Join Binary</button>
                                </Link>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div id="header-right">
                        <div id="header-right-image">
                            <img
                                src={window.location.origin + "/mentor.png"}
                            ></img>
                        </div>
                    </div>
                </header>
                <section className="event-list-container">
                    <h2>Most recent</h2>
                    <Carousel events={mostRecent} />
                    <Link to="/events/filter">See all events</Link>
                </section>

                <section className="event-list-container">
                    <h2>Python events</h2>
                    <Carousel events={pythonEvents} />
                    <Link to="/events/filter?category=Python">
                        See all Python events
                    </Link>
                </section>
                <section className="event-list-container">
                    <h2>JavaScript events</h2>
                    <Carousel events={javascriptEvents} />
                    <Link to="/events/filter?category=JavaScript">
                        See all JavaScript events
                    </Link>
                </section>
                <section className="event-list-container">
                    <h2>HTML events</h2>
                    <Carousel events={htmlEvents} />
                    <Link to="/events/filter?category=HTML">
                        See all HTML events
                    </Link>
                </section>
                <section className="event-list-container">
                    <h2>CSS events</h2>
                    <Carousel events={cssEvents} />
                    <Link to="/events/filter?category=CSS">
                        See all CSS events
                    </Link>
                </section>
                <section className="event-list-container">
                    <h2>React events</h2>
                    <Carousel events={reactEvents} />
                    <Link to="/events/filter?category=React">
                        See all React events
                    </Link>
                </section>
            </div>
        );
    }
};

export default HomePage;
