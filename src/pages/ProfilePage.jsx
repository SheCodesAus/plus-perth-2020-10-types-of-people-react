import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EventCard from "../components/EventCard/EventCard";
import MentorProfileCard from "../components/MentorProfileCard/MentorProfileCard";
import OrgProfileCard from "../components/OrgProfileCard/OrgProfileCard";

const ProfilePage = () => {
  // const [isOrg, setIsOrg] = useState(false);
  const [userData, setUserData] = useState({});
  let user = localStorage.username;
  const [isBusy, setBusy] = useState(true);
  const { username } = useParams();

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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div id="profile-page" className="container">
      {isBusy ? (
        <p>loading</p>
      ) : userData.is_org ? (
        <OrgProfileCard props={userData} />
      ) : (
        <MentorProfileCard props={userData} />
      )}
    </div>
  );
};

export default ProfilePage;
