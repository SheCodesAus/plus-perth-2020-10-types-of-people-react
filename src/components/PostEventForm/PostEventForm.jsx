import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const PostEventForm = () => {
  const [categoryData, setCategoryData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/categories/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setCategoryData(data);
        console.log(data);
      });
  }, []);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEventData((prevEventData) => ({
      ...prevEventData,
      [id]: value,
    }));
  };

  const postData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}events/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        ...eventData,
        date_created: new Date().toISOString(),
      }),
    });
    return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    //Have to select the first category again or it's null
    if (eventData.title && eventData.description && eventData.date) {
      postData().then((response) => {
        window.localStorage.setItem("title", eventData.title);
        history.push("/");
      });
    }
  };

  return (
    <form className="form">
      <div className="form-item">
        <label htmlFor="">Event Name</label>
        <input type="text" id="event_name" onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="">Description</label>
        <input
          type="description"
          id="event_description"
          onChange={handleChange}
        />
      </div>
      <div className="form-item">
        <label htmlFor="">Image</label>
        <input type="url" id="event_image" onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="">Event Date</label>
        <input type="datetime" id="event_date" onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="">Location</label>
        <input type="text" id="event_location" onChange={handleChange} />
      </div>
      <div className="form-item">
        <label htmlFor="">Category</label>
        <select
          type="select"
          id="categories"
          //   placeholder="category"
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
        Post Event
      </button>
    </form>
  );
};

export default PostEventForm;
