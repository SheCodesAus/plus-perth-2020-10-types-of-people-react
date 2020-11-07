import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function EditEventForm(props) {
  const [categoryData, setcategoryData] = useState([]);
  const history = useHistory();
  const { eventData } = props;
  //   const { id } = props;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setcategoryData(data);
      });
  }, []);

  const [credentials, setCredentials] = useState({
    event_name: "",
    event_description: "",
    event_image: "",
    event_location: "",
    event_date: "",
    // date_created: "",
    categories: [""],
  });

  console.log(eventData);

  useEffect(() => {
    setCredentials({
      event_name: eventData.event_name,
      event_description: eventData.event_description,
      event_image: eventData.event_image,
      event_location: eventData.event_location,
      event_date: eventData.event_date,
      // date_created: "",
      categories: eventData.categories,
    });
  }, [eventData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}events/${eventData.id}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(credentials),
      }
    );
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    if (credentials.event_name && credentials.event_description) {
      //   console.log("All data is there");
      editData().then((response) => {
        window.localStorage.setItem("title", credentials.event_name);
        // console.log("set local storage");
        history.push(`/events/${eventData.id}/`);
      });
    }
  };

  return (
    <form className="form">
      <div className="form-item">
        <label htmlFor="event_name">Event Name:</label>
        <input
          type="text"
          id="event_name"
          value={credentials.event_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="event_description">Description:</label>
        <input
          type="text"
          id="event_description"
          value={credentials.event_description}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="event_image">Image:</label>
        <input
          type="url"
          id="event_image"
          value={credentials.event_image}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="event_location">Location:</label>
        <input
          type="text"
          id="event_location"
          value={credentials.event_location}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="event_date">Event Date:</label>
        <input
          type="datetime-local"
          id="event_date"
          value={credentials.event_date}
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="categories">Category:</label>
        <select
          type="select"
          id="categories"
          value={credentials.categories}
          onChange={handleChange}
        >
          {categoryData.map((cat) => (
            <option key={cat.category} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>
      </div>

      <button className="btn" type="submit" onClick={handleSubmit}>
        Update Event
      </button>
    </form>
  );
}

export default EditEventForm;
