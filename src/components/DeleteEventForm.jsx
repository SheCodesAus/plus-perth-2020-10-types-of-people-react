import React from "react";
import { useHistory, useParams } from "react-router-dom";

function DeleteEventForm({ eventData }) {
  const history = useHistory();
  const { id } = useParams();

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}events/${id}/`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    // return response.json();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit pressed");
    editData().then((response) => {
      history.push("/");
      //   window.location.reload();
    });
  };

  const handleReturn = (e) => {
    history.push(`/events/${id}`);
  };

  return (
    <div>
      <h2>
        Are you sure you want to delete this event: "{eventData.event_name}"?
      </h2>
      <button className="btn-danger" type="submit" onClick={handleSubmit}>
        Delete Event
      </button>
      <button className="btn-cancel" type="submit" onClick={handleReturn}>
        Cancel
      </button>
    </div>
  );
}

export default DeleteEventForm;
