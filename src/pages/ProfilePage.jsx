import React, { useState } from "react";
import EventCard from "../components/EventCard/EventCard";
import MentorProfileCard from "../components/MentorProfileCard/MentorProfileCard";
import OrgProfileCard from "../components/OrgProfileCard/OrgProfileCard";

const ProfilePage = () => {
  // Fetch user details and put is_org value into isOrg
  // DUMMY DATA - delete once API fetch is set up
  const [isOrg, setIsOrg] = useState(false);

  return (
    <div id="profile-page" className="container">
      {isOrg ? <OrgProfileCard /> : <MentorProfileCard />}
    </div>
  );
};

export default ProfilePage;
