import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EventCard from "../components/EventCard/EventCard";
import MentorProfileCard from "../components/MentorProfileCard/MentorProfileCard";
import OrgProfileCard from "../components/OrgProfileCard/OrgProfileCard";

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [isBusy, setBusy] = useState(true);
  const { username } = useParams();

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${username}/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setUserData(data);
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
