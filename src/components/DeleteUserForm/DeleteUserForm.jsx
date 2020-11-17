import React from "react";
import { useHistory, useParams } from "react-router-dom";

function DeleteUserFrom() {
  const history = useHistory();
  const { username } = useParams();

  const editData = async () => {
    let token = window.localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`,
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
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      history.push("/");
      window.location.reload();
    });
  };

  const handleReturn = (e) => {
    history.push(`/profile/${username}/`);
    // window.location.reload();
  };

  return (
    <div className="container">
      <h2>Are you sure you want to delete your account, "{username}"? </h2>
      <button className="btn-danger" type="submit" onClick={handleSubmit}>
        Delete User
      </button>
      <button className="btn-cancel" type="submit" onClick={handleReturn}>
        Cancel
      </button>
    </div>
  );
}

export default DeleteUserFrom;
