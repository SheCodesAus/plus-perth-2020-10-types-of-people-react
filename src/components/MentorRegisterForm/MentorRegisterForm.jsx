import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function MentorRegisterForm(props) {
  const { id } = props;
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    // event: "",
    // mentor: id,
    date_registered: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const postData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}events/${id}/responses/`,
      {
        method: "post",
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
    if (credentials.date_registered) {
      postData().then((response) => {
        console.log(response);
        history.push(`/events/${id}`);
        window.location.reload();
      });
    }
  };
  return (
    <form>
      <h3>Register your interest to mentor for the event</h3>
      <div>
        <label htmlFor="date_registered">Register:</label>
        <input
          type="datetime-local"
          id="date_registered"
          //   placeholder=""
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default MentorRegisterForm;
