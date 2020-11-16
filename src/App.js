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
import EditProfileForm from "./pages/EditProfilePage";
import DeleteUserPage from "./pages/DeleteUserPage";
import EditEventPage from "./pages/EditEventPage";
import DeleteEventPage from "./pages/DeleteEventPage";
import FilterEventsPage from "./pages/FilterEventPage";
import PasswordPage from "./pages/PasswordPage";
import MentorAttendedPage from "./pages/MentorAttendedPage";

function App() {
    return (
      <Router>
        <div>
            <Navbar />
            <Switch>
            {/* <Route path="/events/filter/:filter">
                    <FilterEventsPage />
                </Route> */}
                <Route path="/events/filter">
                    <FilterEventsPage />
                </Route>
                <Route path="/events/:id/attended">
                    <MentorAttendedPage />
                </Route>
                <Route path="/events/:id/edit">
                    <EditEventPage />
                </Route>
                <Route path="/events/:id/delete">
                    <DeleteEventPage />
                </Route>
                <Route path="/events/:id">
                    <EventPage />
                </Route>
                <Route path="/profile/:username/edit">
                    <EditProfileForm />
                </Route>
                <Route path="/profile/:username/delete">
                    <DeleteUserPage />
                </Route>
                <Route exact path="/profile/:username">
                    <ProfilePage />
                </Route>
                <Route exact path="/signup">
                    <SignupPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/:username/password">
                    <PasswordPage />
                </Route>
                <Route path="/create-event">
                    <PostEventPage />
                </Route>
                <Route exact path="/">
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

