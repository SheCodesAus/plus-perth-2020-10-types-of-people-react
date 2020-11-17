import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MentorProfileCard from "../components/MentorProfileCard/MentorProfileCard";
import OrgProfileCard from "../components/OrgProfileCard/OrgProfileCard";
import logo from "../Spinner.svg";

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
        <img id="spinner-img" src={logo} alt="loading..." />
      ) : userData.is_org ? (
        <OrgProfileCard props={userData} />
      ) : (
        <MentorProfileCard props={userData} />
      )}
    </div>
  );
};

export default ProfilePage;
