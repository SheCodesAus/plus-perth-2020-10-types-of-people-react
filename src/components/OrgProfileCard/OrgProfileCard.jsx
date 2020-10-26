import React, { useState } from 'react'
import EventCard from '../EventCard/EventCard'
import './OrgProfileCard.css'

const OrgProfileCard = () => {
    // DUMMY DATA

    const profile = {
        company_name: "She Codes",
        contact_name: "Kate Kirwin",
        org_bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat, magnam ullam et nulla ad exercitationem explicabo veniam cum minima voluptatibus, modi ipsum ipsam quis deleniti deserunt qui asperiores dignissimos quos error! Possimus, quaerat nostrum! Mollitia quam impedit voluptatem autem! Ad architecto explicabo deleniti quisquam ipsa fuga ipsam vero? Deleniti odio iste vel placeat explicabo voluptate soluta iusto fugiat est voluptates!",
        image: "https://cdn.shecodes.com.au/wp-content/uploads/2018/10/SheCodes-01.png"
    }

    const eventsHosted = [
        {
            id: 1,
            event_name: "SheCodes Python Workshop",
            event_description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
            event_image: "https://cdn.pixabay.com/photo/2015/01/08/18/24/programming-593312_960_720.jpg",
            event_location: "Riff",
            organiser: "She Codes",
            category: "Python",
            event_date: "Dec 12, 2019"
        },
        {
            id: 2,
            event_name: "SheCodes Junior JavaScript Workshop",
            event_description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
            event_image: "https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg",
            event_location: "Flux",
            organiser: "She Codes",
            category: "JavaScript",
            event_date: "Mar 20, 2019"
        },
        {
            id: 3,
            event_name: "SheCodes One-Day Workshop",
            event_description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed deserunt nulla, excepturi cumque velit iure distinctio itaque, non ad pariatur quod enim praesentium provident incidunt voluptas odio laboriosam asperiores corrupti a odit, eaque dolores laborum sequi ipsa. Iusto distinctio velit sint consectetur maxime repudiandae nemo nostrum! Beatae facere delectus tempora.",
            event_image: "https://cdn.pixabay.com/photo/2017/01/12/10/40/school-1974369_960_720.jpg",
            event_location: "Riff",
            organiser: "She Codes",
            category: "Python",
            event_date: "Jan 9, 2019"
        },
    ]

    const [events, setEvents] = useState(eventsHosted)

    return (
        <>
        <div id="o-profile-sections-1-2">
            <div id="o-profile-section-1">

                <div id="o-profile-left">
                    <h1>{profile.company_name}</h1>
                    <h5>Contact person: {profile.contact_name}</h5>
                </div>
                <div id="o-profile-right">
                    <img id="o-profile-image" src={profile.image} alt={profile.name}/>
                </div>

            </div>
            <div id="o-profile-section-2">
                <h3>Bio</h3>
                <p>{profile.org_bio}</p>
            </div>
        </div>

        <div id="o-profile-section-3">
            <h3>Events hosted by this organisation</h3>
            <div className="event-grid">
                {events.map((event) => {
                    return <EventCard event={event} />
                })}
            </div>
        </div>
    </>
    )
}

export default OrgProfileCard