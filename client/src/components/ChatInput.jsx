import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}




const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 93%;
    height: 2rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    padding: 1.2rem;
    position: relative;
    left: 2rem;
    bottom: 0.2rem;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 58%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 2rem;
      font-size: 1.2rem;
      position: absolute;
      bottom: 0.6rem;
      left: 0.1rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      width: 18%;
      padding: 0.2rem 2rem;
      position: relative;
      bottom: 0.1rem;
      left: 35.8rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;











/* 06/05/2023 es problem bas itni hai ki emoji picker nhi show hu rha hai  */



// import React, { useState } from "react";
// import { BsEmojiSmileFill } from "react-icons/bs";
// import { IoMdSend } from "react-icons/io";
// import styled from "styled-components";
// import Picker from "emoji-picker-react";
// import "./styles/ChatInput.css";

// export default function ChatInput({ handleSendMsg }) {
//   const [msg, setMsg] = useState("");
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const handleEmojiPickerhideShow = () => {
//     setShowEmojiPicker(!showEmojiPicker);
//   };

//   const handleEmojiClick = (event, emojiObject) => {
//     let message = msg;
//     message += emojiObject.emoji;
//     setMsg(message);
//   };

//   const sendChat = (event) => {
//     event.preventDefault();
//     if (msg.length > 0) {
//       handleSendMsg(msg);
//       setMsg("");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="button-container">
//         <div className="emoji">
//           <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
//           <div className="picker">
//           {showEmojiPicker &&  <Picker onEmojiClick={handleEmojiClick} />}
//           </div>
       
//         </div>
//       </div>
//       <form className="input-container" onSubmit={(event) => sendChat(event)}>
//         <input
//           type="text"
//           placeholder="type your message here"
//           onChange={(e) => setMsg(e.target.value)}
//           value={msg}
//         />
//         <button type="submit" className="send-button">
//           <IoMdSend />
//         </button>
//       </form>
//     </div>
//   );
// }


