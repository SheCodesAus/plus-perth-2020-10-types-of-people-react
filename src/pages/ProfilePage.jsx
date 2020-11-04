import React, { useState } from "react";
import EventCard from "../components/EventCard/EventCard";
import MentorProfileCard from "../components/MentorProfileCard/MentorProfileCard";
import OrgProfileCard from "../components/OrgProfileCard/OrgProfileCard";

const ProfilePage = (props) => {
  // Fetch user details and put is_org value into isOrg
  // DUMMY DATA - delete once API fetch is set up
  const [isOrg, setIsOrg] = useState(false);
  const { userData } = props;

  // const Is_organisation = () => {
  //   if (userData.is_org) {
  //     console.log("open is true", isOrg);
  //     //true
  //     return setIsOrg(true);
  //   }
  //   // false;
  // };
  // console.log("this", userData);
  console.log(props);

  return (
    <div id="profile-page" className="container">
      {/* {isOrg ? <OrgProfileCard /> : <MentorProfileCard />} */}
      <OrgProfileCard />
    </div>
  );
};

export default ProfilePage;
