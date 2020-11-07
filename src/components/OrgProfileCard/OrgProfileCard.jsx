import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EventCard from "../EventCard/EventCard";
import "./OrgProfileCard.css";

const OrgProfileCard = (props) => {
  const [OrgDataProfile, setOrgDataProfile] = useState({});
  let user = window.localStorage.getItem("username");
  const [isBusy, setBusy] = useState(true);

  const fetchOrg = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/org/${props.props.username}/profile/`
    );
    if (response.ok) {
      // console.log(response);
      const data = await response.json();
      if (data) {
        setOrgDataProfile(data);
        // console.log(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  useEffect(() => {
    fetchOrg();
  }, []);

  const org_profile = {
    is_org: props.props.is_org,
    username: props.props.username,
    email: props.props.email,
    company_name: OrgDataProfile.company_name,
    contact_name: OrgDataProfile.contact_name,
    org_bio: OrgDataProfile.org_bio,
    image:
      "https://cdn.shecodes.com.au/wp-content/uploads/2018/10/SheCodes-01.png",
    // OrgDataProfile.image,
  };

  // console.log(userData.is_org);

  //   const eventsHosted = [
  //     {
  //       id: 1,
  //       event_name: "SheCodes Python Workshop",
  //       event_description:
  //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
  //       event_image:
  //         "https://cdn.pixabay.com/photo/2015/01/08/18/24/programming-593312_960_720.jpg",
  //       event_location: "Riff",
  //       organiser: "She Codes",
  //       category: "Python",
  //       event_date: "Dec 12, 2019",
  //     },
  //     {
  //       id: 2,
  //       event_name: "SheCodes Junior JavaScript Workshop",
  //       event_description:
  //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
  //       event_image:
  //         "https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg",
  //       event_location: "Flux",
  //       organiser: "She Codes",
  //       category: "JavaScript",
  //       event_date: "Mar 20, 2019",
  //     },
  //     {
  //       id: 3,
  //       event_name: "SheCodes One-Day Workshop",
  //       event_description:
  //         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
  //       event_image:
  //         "https://cdn.pixabay.com/photo/2017/01/12/10/40/school-1974369_960_720.jpg",
  //       event_location: "Riff",
  //       organiser: "She Codes",
  //       category: "Python",
  //       event_date: "Jan 9, 2019",
  //     },
  //   ];

  //   const [events, setEvents] = useState(eventsHosted);
  function IsOwnerCanEdit() {
    // if (username != null) {
    if (user === org_profile.username) {
      return (
        <div id="owner-links">
          <Link to={`/profile/${user}/edit`}>
            <p>Edit</p>
          </Link>
          <Link to={`/profile/${user}/delete`}>
            <p>Delete</p>
          </Link>
        </div>
      );
    } else {
      return <p></p>;
    }
  }
  // }
  return (
    <>
      {isBusy ? (
        <p>loading</p>
      ) : (
        <>
          <div id="profile-exist">
            {(org_profile.company_name === null ||
              org_profile.company_name === undefined) &&
            // (org_profile.image === null || org_profile.image === undefined)&&
            (org_profile.org_bio === null ||
              org_profile.org_bio === undefined) &&
            (org_profile.contact_name === null ||
              org_profile.contact_name === undefined) ? (
              <div>
                <h2>{org_profile.username}</h2>
                <h2>There is no user profile set up for this user </h2>
                {user === org_profile.username ? (
                  <>
                    <p>Tell us about yourself and your skills</p>
                    <IsOwnerCanEdit />
                    <br></br>
                    <p>Email: {org_profile.email}</p>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            ) : (
              <>
                <div id="o-profile-sections-1-2">
                  <div id="o-profile-section-1">
                    <div id="o-profile-left">
                      <h1>{org_profile.company_name}</h1>
                      <h3>{org_profile.username}</h3>
                      <h3>Is organisation: {org_profile.is_org}</h3>
                      <h5>Contact person: {org_profile.contact_name}</h5>
                      <h5>{org_profile.email}</h5>
                      <IsOwnerCanEdit />
                    </div>
                    <div id="o-profile-right">
                      <img
                        id="o-profile-image"
                        src={org_profile.image}
                        alt={org_profile.name}
                      />
                    </div>
                  </div>
                  <div id="o-profile-section-2">
                    <h3>Bio</h3>
                    <p>{org_profile.org_bio}</p>
                  </div>
                </div>
                {/* <div id="m-profile-section-3">
//   <h3>Events I've mentored at</h3>
//   <div className="event-grid">
//     {events.map((event) => {
//       return <EventCard event={event} />;
//     })}
//   </div>
// </div> */}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default OrgProfileCard;
