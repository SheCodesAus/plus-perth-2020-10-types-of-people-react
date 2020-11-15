import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteUserForm from "../components/DeleteUserForm/DeleteUserForm";

function DeleteProfilePage() {
  const [userData, setUserData] = useState({});
  const { username } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);

  return <DeleteUserForm userData={userData} />;
}

export default DeleteProfilePage;
