import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "../assets/loader2.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";
import "./styles/SetAvatar.css";


const  SetAvatar= () =>{
  // Constants and state variables
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // Check if user is logged in, otherwise redirect to login page
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);

  // Set the user's profile picture and update user data in local storage
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  // Fetch avatars from external API and convert them to base64
  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }
    setAvatars(data);
    setIsLoading(false);
  }, []);


// Disable loading indicator when the 'avatars' dependency changes
// useEffect(() => {
//   setIsLoading(false);
// }, [avatars]);



  // Render the component
  return (
    <>
      {isLoading ? (
        <div className="avatar-picker-container">
          <img src={loader} alt="loader" className="avatar-picker-loader" />
        <h2>🥰Mohd❤️️ Rizwan🥰</h2>
        </div>
      ) : (
        <div className="avatar-picker-container">
          <div className="avatar-picker-title">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatar-picker-avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvatar(index)}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="avatar-picker-button">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </div>
      )}
    </>
  );
}


export default SetAvatar ;