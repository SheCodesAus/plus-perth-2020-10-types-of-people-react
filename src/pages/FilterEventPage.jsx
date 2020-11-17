import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EventCard from "../components/EventCard/EventCard";

const FilterEventsPage = () => {
    // for fetching data
    const [eventList, setEventList] = useState([]);
    const [searchTerm, setSearchTerm] = useState();

    // for checking if mentor (location available)
    const [loggedIn, setLoggedIn] = useState(false);
    const [hasLocation, setHasLocation] = useState(false);

    // for styling
    const [filterDescription, setFilterDescription] = useState(
        <p>Showing all events</p>
    );
    const [showCategories, setShowCategories] = useState(false);
    const [showLocations, setShowLocations] = useState(false);

    // Handling queries from url params
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };
    let query = useQuery().get("category");

    // Fetching all events on load
    useEffect(() => {
        window.scrollTo(0, 0);
        const token = window.localStorage.getItem("token");
        const username = window.localStorage.getItem("username");
        token != null ? setLoggedIn(true) : setLoggedIn(false);
        fetch(`${process.env.REACT_APP_API_URL}users/${username}/`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                console.log(data);
                setHasLocation(!data.is_org);
            });
        // if category query show relevant events
        if (query) {
            handleFetch(`events/categories/${query}/events/`);
            setFilterDescription(<p>Showing all {query} events</p>);
        } else {
            fetch(`${process.env.REACT_APP_API_URL}events/`)
                .then((results) => {
                    return results.json();
                })
                .then((data) => {
                    setEventList(data);
                });
        }
    }, []);

    // Function to set the search term
    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to fetch from location endpoint (need token auth)
    const handleLocationFetch = async (url) => {
        let token = window.localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
            method: "get",
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                console.log(data);
                setEventList(data);
                return data;
            });
        return response;
    };

    // Function to fetch from endpoint
    const handleFetch = async (url) => {
        let token = window.localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                console.log(data);
                setEventList(data);
                return data;
            });
        return response;
    };

    // Determine filter on click
    const chooseFilter = (e) => {
        const filter = e.target.name;
        if (
            filter === "HTML" ||
            filter === "CSS" ||
            filter === "JavaScript" ||
            filter === "React" ||
            filter === "Python"
        ) {
            handleFetch(`events/categories/${e.target.name}/events/`);
            setShowCategories(false);
            setFilterDescription(<p>Showing all {e.target.name} events</p>);
        } else if (filter === "100" || filter === "50" || filter === "25") {
            handleLocationFetch(`events/location/${e.target.name}/`);
            setShowLocations(false);
            setFilterDescription(
                <p>
                    Showing events within {e.target.name} kms of your location
                </p>
            );
        } else if (filter === "most-popular") {
            handleFetch(`events/most-popular/`);
            setFilterDescription(<p>Showing most popular events</p>);
        } else if (filter === "all") {
            handleFetch(`events/`);
            setFilterDescription(<p>Showing all events</p>);
        } else if (filter === "search") {
            const keyword = searchTerm.trim();
            handleFetch(`events/search/?query=${keyword}`);
            setFilterDescription(
                <p>Showing all events with keyword "{keyword}"</p>
            );
        }
    };

    return (
        <div id="filter-events-page" className="container">
            <section className="event-list-container">
                <div>
                    <div className="filter-options">
                        <div className="search-bar">
                            <input
                                type="text"
                                id="search"
                                name="search"
                                onChange={handleSearchTerm}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") {
                                        chooseFilter(e);
                                    }
                                }}
                            />
                            <button name="search" onClick={chooseFilter}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                        <div className="filters">
                            <button
                                onClick={() => {
                                    setShowCategories(!showCategories);
                                }}
                            >
                                Search by Category{" "}
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            <div
                                className={
                                    showCategories
                                        ? `show-buttons`
                                        : `hide-buttons`
                                }
                            >
                                <button
                                    type="button"
                                    id="HTML"
                                    name="HTML"
                                    onClick={chooseFilter}
                                >
                                    HTML
                                </button>
                                <button
                                    type="button"
                                    id="CSS"
                                    name="CSS"
                                    onClick={chooseFilter}
                                >
                                    CSS
                                </button>
                                <button
                                    type="button"
                                    id="Python"
                                    name="Python"
                                    onClick={chooseFilter}
                                >
                                    Python
                                </button>
                                <button
                                    type="button"
                                    id="React"
                                    name="React"
                                    onClick={chooseFilter}
                                >
                                    React
                                </button>
                                <button
                                    type="button"
                                    id="JavaScript"
                                    name="JavaScript"
                                    onClick={chooseFilter}
                                >
                                    JavaScript
                                </button>
                            </div>
                        </div>
                        {loggedIn && hasLocation ? (
                            <div className="filters">
                                <button
                                    onClick={() => {
                                        setShowLocations(!showLocations);
                                    }}
                                >
                                    Set km radius{" "}
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                                <div
                                    className={
                                        showLocations
                                            ? `show-buttons`
                                            : `hide-buttons`
                                    }
                                >
                                    <button
                                        type="button"
                                        id="location-filter"
                                        name="100"
                                        onClick={chooseFilter}
                                    >
                                        &lt;100km
                                    </button>
                                    <button
                                        type="button"
                                        id="location-filter"
                                        name="50"
                                        onClick={chooseFilter}
                                    >
                                        &lt;50km
                                    </button>
                                    <button
                                        type="button"
                                        id="location-filter"
                                        name="25"
                                        onClick={chooseFilter}
                                    >
                                        &lt;25km
                                    </button>
                                </div>
                            </div>
                        ) : null}
                        <div className="filters">
                            <button
                                type="button"
                                id="location-filter"
                                name="most-popular"
                                onClick={chooseFilter}
                            >
                                Most Popular
                            </button>
                        </div>
                        <div className="filters">
                            <button
                                type="button"
                                id="all"
                                name="all"
                                onClick={chooseFilter}
                            >
                                See all events
                            </button>
                        </div>
                    </div>
                    <div className="info-panel">{filterDescription}</div>
                    <div className="event-grid">
                        {eventList.length > 0 ? (
                            eventList.map((eventData) => {
                                return (
                                    <EventCard
                                        key={Math.random()}
                                        eventData={eventData}
                                    />
                                );
                            })
                        ) : (
                            <p>No events found</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FilterEventsPage;
