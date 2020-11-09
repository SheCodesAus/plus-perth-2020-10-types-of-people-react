import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import retrieveIcons from "../../utilities/retrieveIcons.js";
import "./MentorProfileCard.css";

const MentorProfileCard = (props) => {
  const [mentorDataProfile, setMentorDataProfile] = useState({});
  let user = window.localStorage.getItem("username");
  const [isBusy, setBusy] = useState(true);
  const [eventList, setEventList] = useState([]);

  const fetchMentor = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}users/mentor/${props.props.username}/profile/`
    );
    if (response.ok) {
      // console.log(response);
      const data = await response.json();
      if (data) {
        setMentorDataProfile(data);
        // console.log(data);
        setBusy(false);
      }
      return;
    }
    const data = await response.json();
  };
  useEffect(() => {
    fetchMentor();
  }, []);

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_URL}events`)
  //     .then((results) => {
  //       return results.json();
  //     })
  //     .then((data) => {
  //       setEventList(data);
  //     });
  // }, []);

  const mentor_profile = {
    is_org: props.props.is_org,
    username: props.props.username,
    email: props.props.email,
    name: mentorDataProfile.name,
    bio: mentorDataProfile.bio,
    image:
      "https://cdn.pixabay.com/photo/2015/03/03/08/55/portrait-657116_960_720.jpg",
    // mentorDataProfile.image,
    skills: mentorDataProfile.skills,
    location: mentorDataProfile.location,
  };

  //   const eventsMentoredAt = [
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

  // fetch events mentored at and replace state value here:
  //   const [events, setEvents] = useState(eventsMentoredAt);
  // const skillIcons = retrieveIcons(mentor_profile.skills).map((icon) => (
  //   <>{icon}</>
  // ));

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
    // }
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
                        src={mentor_profile.image}
                        alt={mentor_profile.username}
                      />
                    </div>
                    <div id="m-profile-right">
                      <h1>{mentor_profile.name}</h1>
                      <IsOwnerCanEdit />
                      <h2>{mentor_profile.username}</h2>
                      <p>Email: {mentor_profile.email}</p>
                      <br></br>
                      <div id="m-profile-skills-container">
                        <h3>Skills:</h3>
                        {/* <p>Skills: {mentor_profile.skills}</p> */}
                        {/* {skillIcons} */}
                        {retrieveIcons(mentor_profile.skills).map((icon) => (
                          <>{icon}</>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div id="m-profile-section-2">
                    <h3>Bio</h3>
                    <p>{mentor_profile.bio}</p>
                    <p>{mentor_profile.location}</p>
                  </div>
                </div>
                <div id="m-profile-section-3">
                  <h3>Events I've mentored at:</h3>
                  {/* <div className="event-grid"> */}
                  {/* {events.map((event) => { */}
                  {/* return <EventCard event={event} />; */}
                  {/* })} */}
                </div>
                {/* </div> */}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MentorProfileCard;
