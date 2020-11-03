import React, { useState } from "react";
import PostEventForm from "../components/PostEventForm/PostEventForm";

const PostEventPage = () => {
  const [isOrg, setIsOrg] = useState(false);

  return (
    <div className="container">
      <h1>Post an Event</h1>
      <PostEventForm />
      {/* {isOrg ? (
        <>
          <h1>Post an Event</h1>
          <PostEventForm />
        </>
      ) : (
        <p>Only Organisations can create events</p>
      )} */}
    </div>
  );
};

export default PostEventPage;
