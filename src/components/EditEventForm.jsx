import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

function EditEventForm({ eventData }) {
    const [errorMessage, setErrorMessage] = useState();
    const [credentials, setCredentials] = useState({
        event_name: "",
        event_description: "",
        event_image: "",
        event_datetime_start: "",
        event_datetime_end: "",
        categories: [],
    });
    const [locationClicked, setLocationClicked] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [locationData, setLocationData] = useState({
        latitude: null,
        longitude: null,
        event_location: "",
    });
    const history = useHistory();

    // Unpacking the data from usePlacesAutocomplete library
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        debounce: 300,
    });

    // on load set current values in form
    useEffect(() => {
        setCredentials({
            event_name: eventData === null ? "" : eventData.event_name,
            event_description: eventData === null ? "" : eventData.event_name,
            event_image: eventData === null ? "" : eventData.event_image,
            event_datetime_start:
                eventData === null ? "" : eventData.event_datetime_start,
            event_datetime_end:
                eventData === null ? "" : eventData.event_datetime_end,
            categories: eventData === null ? "" : eventData.categories,
        });
        setLocationData({
            location: eventData === null ? " " : eventData.location,
        });
        setValue(eventData === null ? " " : eventData.event_location);
    }, [eventData]);

    // on load, set categories to choose from
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

    // Handling input for location
    const handleInput = (e) => {
        setLocationClicked(true);
        setValue(e.target.value);
    };

    // Setting state as the user selects a suggestion
    const handleSelect = ({ description }) => () => {
        setValue(description, false);
        clearSuggestions();

        // Get latitude and longitude via utility functions
        getGeocode({ address: description })
            .then((results) => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setLocationData({
                    latitude: lat,
                    longitude: lng,
                    event_location: description,
                });
            })
            .catch((error) => {
                console.log("Error:", error);
            });
    };

    // Rendering the suggestions from the api as input changes
    const renderSuggestions = () =>
        data.map((suggestion) => {
            // Unpack suggestion
            const {
                id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

            // Render list of suggestions
            return (
                <li key={id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });

    const updateCat = (newCat) => {
        setCredentials({ ...credentials, categories: newCat });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const editData = async () => {
        let token = window.localStorage.getItem("token");

        const data = {
            ...credentials,
            event_location: locationData.event_location,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
        };

        const cleanData = Object.fromEntries(
            // strip out things that are null
            Object.entries(data).filter(([k, v]) => v != null)
        );

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}events/${eventData.id}/`,
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
        const responseData = await response.json();
        return {
            ok: response.ok,
            ...responseData,
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit pressed");
        if (
            credentials.event_name &&
            credentials.event_description &&
            credentials.event_datetime_start &&
            credentials.event_datetime_end &&
            credentials.categories.length > 0
        ) {
            console.log("All data is there");
            editData().then((response) => {
                if (response.ok) {
                    history.push(`/events/${response.id}`);
                } else {
                    if (
                        response.event_description !== undefined &&
                        response.event_description[0] ===
                            "Ensure this field has no more than 500 characters."
                    ) {
                        setErrorMessage(response.event_description[0]);
                    } else {
                        setErrorMessage("Something went wrong");
                    }
                }
            });
        } else {
            setErrorMessage("Please fill out the required fields");
        }
    };

    return (
        <form className="form">
            <div className="form-item">
                <label htmlFor="event_name">Event Name</label>
                <input
                    type="text"
                    id="event_name"
                    value={credentials.event_name}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="event_description">Details</label>
                <textarea
                    type="text"
                    id="event_description"
                    value={credentials.event_description}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="event_image">Add an image</label>
                <input
                    type="url"
                    id="event_image"
                    value={credentials.event_image}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    value={value}
                    onChange={handleInput}
                    onClick={() => setLocationClicked(true)}
                    disabled={!ready}
                    placeholder="Where will the event take place?"
                />
            </div>
            {status === "OK" && locationClicked ? (
                <div className="form-item">
                    <label></label>
                    <ul className="location-options">{renderSuggestions()}</ul>
                </div>
            ) : null}
            <div className="form-item">
                <label htmlFor="event_date">Starts</label>
                <input
                    type="datetime-local"
                    id="event_datetime_start"
                    value={credentials.event_datetime_start}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <label htmlFor="event_date">Ends</label>
                <input
                    type="datetime-local"
                    id="event_datetime_end"
                    value={credentials.event_datetime_end}
                    onChange={handleChange}
                />
            </div>
            <div className="form-item">
                <Fragment>
                    <div className="category-item-container">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Mentor skills needed</Form.Label>
                            <Typeahead
                                id="categories"
                                labelKey="categories"
                                multiple
                                onChange={updateCat}
                                options={category_option}
                                selected={credentials.categories}
                            />
                        </Form.Group>
                    </div>
                </Fragment>
            </div>
            {errorMessage && <p className="alert">{errorMessage}</p>}
            <button className="btn" type="submit" onClick={handleSubmit}>
                Update Event
            </button>
        </form>
    );
}

export default EditEventForm;
