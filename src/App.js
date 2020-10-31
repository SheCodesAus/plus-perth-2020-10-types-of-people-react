import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"
import HomePage from "./pages/HomePage"
import "./App.css";
import EventPage from "./pages/EventPage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PostEventPage from "./pages/PostEventPage";
import Error404 from "./pages/Error404";


function App() {
    return (
      <Router>
        <div>
            <Navbar />
            <Switch>
                <Route path="/events">
                    <EventPage />
                </Route>
                <Route path="/event/:id">
                    <EventPage />
                </Route>
                <Route path="/profile/:username">
                    <ProfilePage />
                </Route>
                <Route exact path="/signup">
                    <SignupPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/create-event">
                    <PostEventPage />
                </Route>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route>
                    <Route path="*" exact={true} component={Error404} />
                </Route>
            </Switch>
            <Footer />
        </div>
      </Router>
    );
}

export default App;

