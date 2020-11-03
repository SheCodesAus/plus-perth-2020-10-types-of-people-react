import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import EditOrgProfileForm from "../components/OrgProfileCard/EditOrgProfileForm";
import EditMentorProfileForm from "../components/MentorProfileCard/EditMentorProfileForm";

function EditProfilePage() {
  const [userData, setUserData] = useState({});
  //   const [userDataProfile, setUserDataProfile] = useState({});
  const [isOrg, setIsOrg] = useState(false);

  const { username } = useParams();
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username_ST = localStorage.username;
  username_ST = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);

  return (
    <div>
      {LoggedIn && username_ST == username ? (
        <>
          <p>Logged in as {username} </p>
          {isOrg ? (
            <EditOrgProfileForm userData={userData} />
          ) : (
            <EditOrgProfileForm userData={userData} />

            // <EditMentorProfileForm userData={userData} />
          )}
        </>
      ) : (
        <>
          <p>Login to edit a user profile </p>
        </>
      )}
    </div>
  );
}

export default EditProfilePage;
