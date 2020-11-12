import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EventCard from "../components/EventCard/EventCard";

const FilterEventsPage = () => {
  const [eventList, setEventList] = useState([]);
  const [locationEventList, setLocationEventList] = useState([]);
  const [popularEventList, setPopularEventList] = useState([]);
  const [locationKms, setLocationKms] = useState();
  const [filter, setFilter] = useState();

  //backend urls
  //   events/categories/<str:category>/events/
  //   events/most-popular/
  //events/location/<int:kms>/

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setEventList(data);
      });
  }, []);

  //   useEffect(() => {
  //     fetch(`${process.env.REACT_APP_API_URL}events/location/${locationKms}`)
  //       .then((results) => {
  //         return results.json();
  //       })
  //       .then((data) => {
  //         setLocationEventList(data);
  //       });
  //   }, []);

  //   useEffect(() => {
  //     fetch(`${process.env.REACT_APP_API_URL}events/most-popular/`)
  //       .then((results) => {
  //         return results.json();
  //       })
  //       .then((data) => {
  //         setPopularEventList(data);
  //       });
  //   }, []);

  const changeFilter = (event) => {
    if (event.target.name === "All") {
      setFilter();
    } else {
      setFilter(event.target.name);
    }
  };

  return (
    <div id="home-page" className="container">
      <section className="event-list-container">
        <div>
          <div className="filter-options">
            <button type="button" id="HTML" name="HTML" onClick={changeFilter}>
              HTML
            </button>
            <button type="button" id="CSS" name="CSS" onClick={changeFilter}>
              CSS
            </button>
            <button
              type="button"
              id="Python"
              name="Python"
              onClick={changeFilter}
            >
              Python
            </button>
            <button
              type="button"
              id="React"
              name="React"
              onClick={changeFilter}
            >
              React
            </button>
            <button
              type="button"
              id="JavaScript"
              name="JavaScript"
              onClick={changeFilter}
            >
              JavaScript
            </button>
            <button type="button" id="all" name="All" onClick={changeFilter}>
              All
            </button>
          </div>
          <p>See the trending events below.</p>
          <br></br>
          <div className="event-grid">
            {eventList.reduce((total, eventData, key) => {
              if (filter != null && !eventData.categories.includes(filter))
                return total;
              total.push(<EventCard key={key} eventData={eventData} />);
              return total;
            }, [])}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilterEventsPage;
