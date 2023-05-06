import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import "./styles/Logout.css";

const  Logout= () => {
  // Initialize navigate function from react-router-dom
  const navigate = useNavigate();

  // Handle click event for logging out
  const handleClick = async () => {
    // Get the user's ID from local storage
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;

    // Send a request to the logout route with the user's ID
    const data = await axios.get(`${logoutRoute}/${id}`);

    // If the logout is successful, clear local storage and navigate to the login page
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  // Render the logout button
  return (
    <button className="button" onClick={handleClick}>
      <BiPowerOff className="icon" />
    </button>
  );
}

export default  Logout;