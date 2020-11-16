import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
let username = window.localStorage.getItem("username");

const Footer = () => {
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  let username = localStorage.username;
  username = window.localStorage.getItem("username");

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = window.localStorage.getItem("token");
    token != null ? setLoggedIn(true) : setLoggedIn(false);
  }, [location]);

  return (
    <div id="footer">
      <div id="footer-top">
        {!LoggedIn ? (
          <>
            <Link id="big-button" to="/signup">
              Get started today!
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
      <div id="footer-main">
        <div id="footer-main-top">
          <div id="footer-main-top-left">
            <div id="footer-main-top-left-1">
              <h5>Your account</h5>
              <Link to={`/profile/${username}/edit`}>edit account details</Link>
              <Link to="/">help</Link>
            </div>
            <div id="footer-main-top-left-2">
              <h5>Follow us!</h5>
              <div id="footer-socials">
                <a href="https://facebook.com" target="_blank">
                  Facebook
                </a>
                <a href="https://instagram.com" target="_blank">
                  Instagram
                </a>
                <a href="https://twitter.com" target="_blank">
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div id="footer-main-top-right">
            <h5>About Binary</h5>
            <Link to="/">copyright</Link>
            <Link to="/">terms and conditions</Link>
            <Link to="/">careers</Link>
          </div>
        </div>
        <div id="footer-main-bottom">
          <Link to="/">
            <img
              id="footer-logo"
              src={window.location.origin + "/binary_logo.png"}
              alt="Binary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
