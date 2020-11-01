import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EventCard from "../EventCard/EventCard";
import "./OrgProfileCard.css";

const OrgProfileCard = () => {
  const [userDataProfile, setUserDataProfile] = useState({});
  const [userData, setUserData] = useState({});
  // console.log("profile", userDataProfile);
  let user = localStorage.username;

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/${user}/`
    );
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      //   console.log(data);
      return;
    }
    const data = await response.json();
  };

  const fetchOrg = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/org/${user}/profile/`
    );
    if (response.ok) {
      const data = await response.json();
      setUserDataProfile(data);
      //   console.log(data);
      return;
    }
    const data = await response.json();
  };

  useEffect(() => {
    fetchUser();
    fetchOrg();
  }, []);

  // console.log(userData.is_org);

  const profile = {
    is_org: userData.is_org,
    username: userData.username,
    email: userData.email,
    company_name: userDataProfile.company_name,
    contact_name: userDataProfile.contact_name,
    org_bio: userDataProfile.org_bio,
    //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat, magnam ullam et nulla ad exercitationem explicabo veniam cum minima voluptatibus, modi ipsum ipsam quis deleniti deserunt qui asperiores dignissimos quos error! Possimus, quaerat nostrum! Mollitia quam impedit voluptatem autem! Ad architecto explicabo deleniti quisquam ipsa fuga ipsam vero? Deleniti odio iste vel placeat explicabo voluptate soluta iusto fugiat est voluptates!",
    image:
      "https://cdn.shecodes.com.au/wp-content/uploads/2018/10/SheCodes-01.png",
  };

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
    user = window.localStorage.getItem("username");
    // if (username != null) {
    if (user === profile.username) {
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
    // }
  }
  return (
    <>
      <div id="o-profile-sections-1-2">
        <div id="o-profile-section-1">
          <div id="o-profile-left">
            <h1>{profile.company_name}</h1>
            <h3>{profile.username}</h3>
            <h3>Is organisation: {profile.is_org}</h3>
            <h5>Contact person: {profile.contact_name}</h5>
            <h5>{profile.email}</h5>
            <IsOwnerCanEdit />
          </div>
          <div id="o-profile-right">
            <img id="o-profile-image" src={profile.image} alt={profile.name} />
          </div>
        </div>
        <div id="o-profile-section-2">
          <h3>Bio</h3>
          <p>{profile.org_bio}</p>
        </div>
      </div>
      {/* {profile.company_name == null && (
        <div>
          {profile.contact_name}: " ", {profile.org_bio}: " ",
          <h2>
            There is no user profile set up for an {profile.username} user
          </h2>
        </div>
      )} */}
      {/* <div id="o-profile-section-3">
        <h3>Events hosted by this organisation</h3>
        <div className="event-grid">
          {events.map((event) => {
            return <EventCard event={event} />;
          })}
        </div>
      </div> */}
    </>
  );
};

export default OrgProfileCard;
