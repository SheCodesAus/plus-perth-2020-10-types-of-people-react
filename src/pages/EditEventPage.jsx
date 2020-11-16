import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import EditEventForm from "../components/EditEventForm";

function EditEventPage() {
    const [LoggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    let username = window.localStorage.getItem("username");
    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        token != null ? setLoggedIn(true) : setLoggedIn(false);
    }, [location]);

    const [eventData, setEventData] = useState();
    const { id } = useParams();

    const fetchEvent = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}events/${id}/`
        );
        if (response.ok) {
            console.log(response);
            const data = await response.json();

            if (data) {
                setEventData(data);
                console.log(data);
                setBusy(false);
            }
            return;
        }
        const data = await response.json();
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    return (
        <div className="container">
            {isBusy ? (
                <p>loading</p>
            ) : // {/* {LoggedIn && username == eventData.organiser ? ( */}

            LoggedIn ? (
                <>
                    <h1>Editing Event: {eventData.event_name}</h1>
                    <Link className="margin-bottom" to={`/events/${id}`}>
                        Back to event
                    </Link>
                    <EditEventForm eventData={eventData} />
                </>
            ) : (
                <>
                    <p>Login to create or edit a event </p>
                </>
            )}
        </div>
    );
}

export default EditEventPage;
