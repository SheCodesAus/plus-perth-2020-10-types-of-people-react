import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import EditOrgProfileForm from "../components/OrgProfileCard/EditOrgProfileForm";
import EditMentorProfileForm from "../components/MentorProfileCard/EditMentorProfileForm";

function EditProfilePage() {
  const [userData, setUserData] = useState({});
  const [userDataProfile, setUserDataProfile] = useState({});
  //   const [userDataProfile, setUserDataProfile] = useState({});
  const [isOrg, setIsOrg] = useState(false);
  const [isBusy, setBusy] = useState(true);

  const { username } = useParams();
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username_ST = localStorage.username;
  username_ST = window.localStorage.getItem("username");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`
    );
    if (response.ok) {
      console.log(response);
      const data = await response.json();

      if (data) {
        setUserData(data);
        console.log(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  const fetchOrgProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/org/${username_ST}/profile/`
    );
    if (response.ok) {
      console.log(response);
      const data = await response.json();

      if (data) {
        setUserDataProfile(data);
        console.log(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };
  const fetchMentorProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/org/${username_ST}/profile/`
    );
    if (response.ok) {
      console.log(response);
      const data = await response.json();

      if (data) {
        setUserDataProfile(data);
        console.log(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  useEffect(() => {
    fetchUser();
    fetchMentorProfile();
    fetchOrgProfile();
  }, []);

  return (
    <div>
      {isBusy ? (
        <p>loading</p>
      ) : LoggedIn && username_ST == username ? (
        <>
          {isOrg ? (
            <EditOrgProfileForm
              userData={userData}
              userDataProfile={userDataProfile}
            />
          ) : (
            <EditOrgProfileForm
              userData={userData}
              userDataProfile={userDataProfile}
            />
            // <EditMentorProfileForm
            // userData={userData}
            // userDataProfile={userDataProfile}
          )}
        </>
      ) : (
        <>
          <p>Login to create or edit a event </p>
        </>
      )}
    </div>
  );
}

export default EditProfilePage;
