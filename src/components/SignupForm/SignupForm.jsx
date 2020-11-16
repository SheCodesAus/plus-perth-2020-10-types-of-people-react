import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const history = useHistory();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const postData = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api-token-auth/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }
        );
        if (!response.ok) throw new Error("Password error");
        return response.json();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.username && credentials.password) {
            postData()
                .then((response) => {
                    window.localStorage.setItem("token", response.token);
                    window.localStorage.setItem(
                        "username",
                        credentials.username
                    );
                    history.push("/");
                })
                .catch(() => {
                    alert("password error");
                });
        }
    };

    return (
        <form className="form">
            <div className="form-item">
                <label htmlFor="">Username</label>
                <input type="text" id="username" onChange={handleChange} />
            </div>
            <div className="form-item">
                <label htmlFor="">Password</label>
                <input type="password" id="password" onChange={handleChange} />
            </div>
            <button className="btn" type="submit" onClick={handleSubmit}>
                Log in
            </button>
        </form>
    );
};

export default LoginForm;
