import React from 'react'
import { Link } from "react-router-dom"
import './Navbar.css'

const Navbar = () => {
    return (
        <>
            <div id="navbar">
                <div id="navbar-logo-container">
                    <Link to="/"><img id="navbar-logo" src={window.location.origin + "/binary_logo.png"} alt="Binary"/></Link>
                </div>
                <div id="navbar-menu-items">
                    <Link className="navbar-menu-item" to="/login">Login</Link>
                    <Link className="navbar-menu-item" to="/signup">Sign up</Link>
                </div>
            </div>
            <div className="separation-container"></div>
        </>
    )
}

export default Navbar