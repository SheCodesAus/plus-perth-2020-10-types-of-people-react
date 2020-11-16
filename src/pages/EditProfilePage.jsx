import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import EditOrgProfileForm from "../components/OrgProfileCard/EditOrgProfileForm";
import EditMentorProfileForm from "../components/MentorProfileCard/EditMentorProfileForm";

function EditProfilePage() {
    const [userData, setUserData] = useState({ loading: true });
    const [orgDataProfile, setOrgDataProfile] = useState({});
    const [mentorDataProfile, setMentorDataProfile] = useState({});
    const [isBusy, setBusy] = useState(true);
    const { username } = useParams();
    const [LoggedIn, setLoggedIn] = useState(false);
    const location = useLocation();
    // let username_ST = window.localStorage.getItem("username");

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        token != null ? setLoggedIn(true) : setLoggedIn(false);
    }, [location]);

    const fetchUser = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}users/${username}/`
        );
        if (response.ok) {
            const data = await response.json();
            if (data) {
                setUserData(data);
                setBusy(false);
            }
            return;
        }
        const data = await response.json();
    };

    const fetchOrgProfile = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}users/org/${username}/profile/`
        );
        if (response.ok) {
            const data = await response.json();
            if (data) {
                setOrgDataProfile(data);
                // setBusy(false);
            }
            return;
        }
        const data = await response.json();
    };

    const fetchMentorProfile = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}users/mentor/${username}/profile/`
        );
        if (response.ok) {
            const data = await response.json();
            if (data) {
                setMentorDataProfile(data);
                // setBusy(false);
            }
            return;
        }
        const data = await response.json();
    };

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        if (!userData.loading) {
            userData.is_org ? fetchOrgProfile() : fetchMentorProfile();
        }
    }, [userData]);

    return (
        <div className="container">
            <Link className="margin-bottom" to={`/profile/${username}`}>
                Back to profile
            </Link>
            {/* {isBusy ? (
        <p>loading</p>
      ) : // ) : LoggedIn && username_ST == username ? (
      isBusy2 ? (
        <p>Loading profile data</p>
      ) : // ) : LoggedIn && use */}
            {LoggedIn ? (
                isBusy ? (
                    <p>loading</p>
                ) : (
                    <>
                        {!userData.loading ? (
                            userData.is_org ? (
                                <EditOrgProfileForm
                                    userData={userData}
                                    orgDataProfile={orgDataProfile}
                                />
                            ) : (
                                <EditMentorProfileForm
                                    userData={userData}
                                    mentorDataProfile={mentorDataProfile}
                                />
                            )
                        ) : (
                            <></>
                        )}
                    </>
                )
            ) : (
                <>
                    <p>Login to create a profile </p>
                </>
            )}
        </div>
    );
}

export default EditProfilePage;
