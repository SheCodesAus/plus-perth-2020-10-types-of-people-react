import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EventCard from "../../components/EventCard/EventCard";
import retrieveIcons from "../../utilities/retrieveIcons.js";
import "./MentorProfileCard.css";

const MentorProfileCard = () => {
  const [userData, setUserData] = useState();
  const { username } = useParams();
  let user = localStorage.username;

  // DUMMY DATA - delete once API fetch is set up

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}users/${username}/`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUserData(data);
      });
  }, []);
  console.log(userData);

  const profile = {
    // is_org: userData.is_org,
    user: username,
    // email: userData.email,
    // name: "Jane Doe",
    bio:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus corrupti sit recusandae sapiente rem? Placeat harum cupiditate laudantium corrupti ratione magnam quia quo. Ad consequuntur odio rerum impedit. Perferendis natus magnam nemo quia quod quas esse quibusdam beatae nesciunt. Animi in, nulla perferendis asperiores reprehenderit natus, quo sint, repellendus accusantium consectetur minus? Quia officiis repellendus assumenda laborum voluptas? Nostrum, ullam iusto assumenda rerum adipisci consequatur repellendus consequuntur aliquam autem esse aliquid voluptate sapiente consectetur ea nam eum quam tempore molestias!",
    image:
      "https://cdn.pixabay.com/photo/2015/03/03/08/55/portrait-657116_960_720.jpg",
    skills: ["Python", "JavaScript"],
  };

  const eventsMentoredAt = [
    {
      id: 1,
      event_name: "SheCodes Python Workshop",
      event_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
      event_image:
        "https://cdn.pixabay.com/photo/2015/01/08/18/24/programming-593312_960_720.jpg",
      event_location: "Riff",
      organiser: "She Codes",
      category: "Python",
      event_date: "Dec 12, 2019",
    },
    {
      id: 2,
      event_name: "SheCodes Junior JavaScript Workshop",
      event_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
      event_image:
        "https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg",
      event_location: "Flux",
      organiser: "She Codes",
      category: "JavaScript",
      event_date: "Mar 20, 2019",
    },
    {
      id: 3,
      event_name: "SheCodes One-Day Workshop",
      event_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
      event_image:
        "https://cdn.pixabay.com/photo/2017/01/12/10/40/school-1974369_960_720.jpg",
      event_location: "Riff",
      organiser: "She Codes",
      category: "Python",
      event_date: "Jan 9, 2019",
    },
  ];

  // fetch events mentored at and replace state value here:
  const [events, setEvents] = useState(eventsMentoredAt);
  const skillIcons = retrieveIcons(profile.skills).map((icon) => <>{icon}</>);

  function IsOwnerCanEdit() {
    user = window.localStorage.getItem("username");
    // if (username != null) {
    if (user === username) {
      return (
        <div id="owner-links">
          <Link to={`/profile/${username}/edit`}>
            <p>Edit</p>
          </Link>
          <Link to={`/profile/${username}/delete`}>
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
      <div id="m-profile-sections-1-2">
        <div id="m-profile-section-1">
          <div id="m-profile-left">
            <img id="m-profile-image" src={profile.image} alt={profile.user} />
          </div>

          <div id="m-profile-right">
            <h1>{profile.user}</h1>
            {/* <p>Email: {profile.email}</p> */}
            <IsOwnerCanEdit />
            <div id="m-profile-skills-container">{skillIcons}</div>
          </div>
        </div>
        <div id="m-profile-section-2">
          <h3>Bio</h3>
          <p>{profile.bio}</p>
        </div>
      </div>
      <div id="m-profile-section-3">
        <h3>Events I've mentored at</h3>
        <div className="event-grid">
          {events.map((event) => {
            return <EventCard event={event} />;
          })}
        </div>
      </div>
    </>
  );
};

export default MentorProfileCard;
