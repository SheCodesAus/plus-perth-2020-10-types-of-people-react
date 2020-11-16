import { Link, useHistory } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import "./MentorProfileCard.css";

function EditProfileFrom(props) {
    const [errorMessage, setErrorMessage] = useState();
    const history = useHistory();
    const { userData, mentorDataProfile } = props;
    let username = window.localStorage.getItem("username");
    const [categoryData, setCategoryData] = useState([]);
    const [locationClicked, setLocationClicked] = useState(false);

    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
    });

    const [publicProfile, setPublicProfile] = useState({
        name: "",
        bio: "",
        skills: [],
        mentor_image: "",
    });

    const [locationData, setLocationData] = useState({
        latitude: null,
        longitude: null,
        location: "",
    });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}events/categories/`)
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                setCategoryData(data);
            });
    }, []);

    const category_option = categoryData.map((category) => category.category);

    useEffect(() => {
        setCredentials({
            username: userData.username,
            email: userData.email,
        });
        setPublicProfile({
            bio: mentorDataProfile === null ? " " : mentorDataProfile.bio,
            name:
                mentorDataProfile === undefined ? " " : mentorDataProfile.name,
            skills: mentorDataProfile === null ? " " : mentorDataProfile.skills,
            mentor_image:
                mentorDataProfile === null
                    ? " "
                    : mentorDataProfile.mentor_image,
        });
        setLocationData({
            location:
                mentorDataProfile === null ? " " : mentorDataProfile.location,
        });
        setValue(mentorDataProfile === null ? " " : mentorDataProfile.location);
    }, [userData, mentorDataProfile]);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });

    const handleInput = (e) => {
        setLocationClicked(true);
        setValue(e.target.value);
    };

    const handleSelect = ({ description }) => () => {
        setValue(description, false);
        clearSuggestions();

        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setLocationData({
                    latitude: lat,
                    longitude: lng,
                    location: description,
                });
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            return (
                <li key={id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    const updateCat = (newCat) => {
        setPublicProfile({ ...publicProfile, skills: newCat });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "email") {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [id]: value,
            }));
        } else {
            setPublicProfile((prevCredentials) => ({
                ...prevCredentials,
                [id]: value,
            }));
        }
    };

    const editData = async () => {
        let token = window.localStorage.getItem("token");

        const fetch1 = fetch(
            `${process.env.REACT_APP_API_URL}users/${username}/`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(credentials),
            }
        );

        const data = {
            ...publicProfile,
            location: locationData.location,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
        };
        const cleanData = Object.fromEntries(
            // strip out things that are null
            Object.entries(data).filter(([k, v]) => v != null)
        );

        const fetch2 = fetch(
            `${process.env.REACT_APP_API_URL}users/mentor/${username}/profile/`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(cleanData),
            }
        );

        const responses = await Promise.all([fetch1, fetch2]);
        return responses;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Submit pressed");
        if (credentials.username) {
            editData()
                .then((responses) => {
                    if (responses[0].ok && responses[1].ok) {
                        history.push(`/profile/${username}`);
                    } else {
                        setErrorMessage("Invalid details");
                    }
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        } else {
            setErrorMessage("Please fill out the required fields");
        }
    };

    return (
        <form className="form">
            <div className="form-item">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={credentials.email}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={publicProfile.name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="bio">Bio:</label>
                <textarea
                    type="text"
                    id="bio"
                    defaultValue={publicProfile.bio}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="mentor_image">Image</label>
                <input
                    type="url"
                    id="mentor_image"
                    defaultValue={publicProfile.mentor_image}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="location">Event location</label>
                <input
                    id="location"
                    value={value}
                    onChange={handleInput}
                    onClick={() => setLocationClicked(true)}
                    disabled={!ready}
                    placeholder="Where would you like to see events?"
                />
            </div>
            {status === "OK" && locationClicked ? (
                <div id="location-suggestions" className="form-item">
                    <label></label>
                    <ul className="location-options">{renderSuggestions()}</ul>
                </div>
            ) : null}
            <div className="form-item">
                <Fragment>
                    <div className="category-item-container">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Skills</Form.Label>
                            <Typeahead
                                id="skills"
                                labelKey="skills"
                                multiple
                                onChange={updateCat}
                                options={category_option}
                                selected={publicProfile.skills}
                            />
                        </Form.Group>
                    </div>
                </Fragment>
            </div>
            <div>
                <Link to={`/${username}/password`}>
                    <p>Reset Password</p>
                </Link>
            </div>
            {errorMessage && <p className="alert">{errorMessage}</p>}
            <button className="btn" type="submit" onClick={handleSubmit}>
                Update Account
            </button>
        </form>
    );
}

export default EditProfileFrom;
