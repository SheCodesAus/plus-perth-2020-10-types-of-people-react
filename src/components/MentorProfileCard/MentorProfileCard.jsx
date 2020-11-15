import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import retrieveIcons from "../../utilities/retrieveIcons.js";
import "./MentorProfileCard.css";

const MentorProfileCard = (props) => {
  //props is userData
  const [mentorDataProfile, setMentorDataProfile] = useState({});
  let user = window.localStorage.getItem("username");
  const [isBusy, setBusy] = useState(true);
  const [eventsAttended, setEventsAttended] = useState([]);

  const fetchMentorEvents = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}events/${user}/mentor-attendance/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setEventsAttended(data);
        console.log(data);
        // setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };

  const fetchMentor = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/mentor/${user}/profile/`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setMentorDataProfile(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };
  useEffect(() => {
    fetchMentor();
    fetchMentorEvents();
  }, []);

  const mentor_profile = {
    is_org: props.props.is_org,
    username: props.props.username,
    email: props.props.email,
    name: mentorDataProfile.name,
    bio: mentorDataProfile.bio,
    mentor_image: mentorDataProfile.mentor_image,
    // "https://cdn.pixabay.com/photo/2015/03/03/08/55/portrait-657116_960_720.jpg",
    skills: mentorDataProfile.skills,
    location: mentorDataProfile.location,
  };

  function IsOwnerCanEdit() {
    // if (username != null) {
    if (user === mentor_profile.username) {
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

  return (
    <>
      {isBusy ? (
        <p>loading</p>
      ) : (
        <>
          <div id="profile-exist">
            {(mentorDataProfile.name === null ||
              mentorDataProfile.name === undefined) &&
            mentorDataProfile.skills.length == 0 &&
            // (mentor_profile.image === null ||
            //   mentor_profile.image === undefined) &&
            (mentor_profile.bio === null ||
              mentor_profile.bio === undefined) ? (
              <div>
                <h2>{mentor_profile.username}</h2>
                <h2>There is no user profile set up for this user </h2>
                {user === mentor_profile.username ? (
                  <>
                    <p>Tell us about yourself and your skills</p>
                    <IsOwnerCanEdit />
                    <br></br>
                    <p>Email: {mentor_profile.email}</p>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            ) : (
              <>
                <div id="m-profile-sections-1-2">
                  <div id="m-profile-section-1">
                    <div id="m-profile-left">
                      <img
                        id="m-profile-image"
                        src={mentor_profile.mentor_image}
                        alt={mentor_profile.username}
                      />
                    </div>
                    <div id="m-profile-right">
                      <h1>{mentor_profile.name}</h1>
                      <IsOwnerCanEdit />
                      <h2>{mentor_profile.username}</h2>
                      <p>Email: {mentor_profile.email}</p>
                      {retrieveIcons(mentor_profile.skills).map((icon) => (
                        <>{icon}</>
                      ))}
                    </div>
                  </div>
                  <div id="m-profile-section-2">
                    <h3>Bio</h3>
                    <p>{mentor_profile.bio}</p>
                    <p>{mentor_profile.location}</p>
                  </div>
                </div>
                <div id="m-profile-section-3">
                  {/* <h3>Events I've signed up for</h3> */}
                  <h3>Events I've mentored at</h3>
                  <div className="event-grid">
                    {eventsAttended.map((eventData, key) => {
                      return <EventCard key={key} eventData={eventData} />;
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MentorProfileCard;
