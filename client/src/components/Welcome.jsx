import React, { useState, useEffect } from "react";
import Robot from "../assets/robot2.gif";
import "./styles/Welcome.css"; // Import the CSS file

const  Welcome = () => {
  // React hooks and initial values
  const [userName, setUserName] = useState("");

  // Fetch the username from local storage and set it as state
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  // Render the Welcome component
  return (
    <div className="container">
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </div>
  );
}


export default Welcome;