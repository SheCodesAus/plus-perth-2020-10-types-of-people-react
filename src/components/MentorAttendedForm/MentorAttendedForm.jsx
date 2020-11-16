import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const MentorAttendedForm = () => {
  const { id } = useParams();
  const [mentorsAtt, setMentorsAtt] = useState({ responses: [] });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}events/${id}/attendance/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        console.log(data);
        setMentorsAtt(data);
      });
  }, []);


  const putEvent = () => {
    return fetch(
      `${process.env.REACT_APP_API_URL}events/${id}/attendance/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mentorsAtt),
      }
    );
  };
  const setAttended = (mentor, attended) => {
      mentorsAtt.responses.forEach(element => {
      if (element.mentor === mentor) {
        element.attended = attended
      }
    })
  };
 
  const isChecked = (event, name) => {
    event.target.checked
      ? setAttended(name, true)
      : setAttended(name, false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mentorsAtt)
    putEvent()
    .then((res) => {
      return res;
    })
  };

  return (
    <form className="form">
      <div className="form-item">
        { ( mentorsAtt !== undefined) ?
        mentorsAtt.responses.map((username) => (
          <div>
            <label htmlFor="mentor">{username.mentor}</label>
            <input
              type="checkbox"
              id="attended"
              onChange={(event) => {
                isChecked(event, username.mentor);
              }}
            />
          </div>
        )) : "Loading" }
      </div>
      <button className="btn" type="submit" onClick={handleSubmit}>
        Confirm Attendance
      </button>
    </form>
  );
};

export default MentorAttendedForm;
