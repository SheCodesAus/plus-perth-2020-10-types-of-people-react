import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./MentorRegisterForm.css";

function MentorRegisterForm(props) {
    const [isRegistered, setIsRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();

    const { id, eventData, username } = props;
    const history = useHistory();

    const checkIsRegistered = () => {
        for (var i = 0; i < eventData.responses.length; i++) {
            if (eventData.responses[i].mentor === username) {
                setIsRegistered(true);
                break;
            }
        }
    };

    useEffect(() => {
        checkIsRegistered();
    });

    const postResponse = async () => {
        let token = window.localStorage.getItem("token");
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}events/${id}/register/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${token}`,
                },
            }
        );
        return response.json();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        postResponse().then((response) => {
            if (response.detail) {
                setErrorMessage("You have already registered for this event!");
            } else {
                setSuccessMessage("You have successfully registered.");
            }
        });
    };

    return (
        <form id="mentor-register-form">
            <h3>Register your interest to mentor for the event</h3>
            <div>
                {successMessage && (
                    <p className="success-message margin-bottom">
                        {successMessage}
                    </p>
                )}
                {errorMessage && (
                    <p className="alert margin-bottom">{errorMessage}</p>
                )}
                {isRegistered ? (
                    <p>You are registered!</p>
                ) : (
                    <button className="btn" onClick={handleSubmit}>
                        Register Now
                    </button>
                )}
            </div>
        </form>
    );
}

export default MentorRegisterForm;
