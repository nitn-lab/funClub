import React, { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa6";
import InputEmoji from "react-input-emoji";
import ReactScrollToBottom from "react-scroll-to-bottom";
import logo from "../assets/images/FUNCLUB logo.png";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import Popup from "./Popup.js";
import CallPopup from "./CallPopup.js";

const ChatScreen = () => {
  const receiver = JSON.parse(localStorage.getItem("receiver"));
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [open, setOpen] = useState(false);
  const [callPopup, setCallPopup] = useState(false);

  const handlePopup = () => {
    setOpen(!open);
  };
  useEffect(() => {
    handlePopup();
  }, []);


  const handleCallPopup = () => {
    setCallPopup(!callPopup);
  };

  
  const handleChange = (message) => {
    setMessage(message);
  };
  const handleSend = () => {
    setMessages([...messages, { text: message, _id: receiver._id }]);
    setMessage("");
  };
  return (
    <>
      {receiver ? (
        <div className="chat-screen w-full">
          <div className="header bg-[#8488d6] text-white px-10 py-3.5 xs:px-5">
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center xs:gap-3">
                <div>
                  <img
                    src={
                      receiver.profile_url === ""
                        ? `https://avatar.iran.liara.run/username?username=${receiver.firstname}+${receiver.lastname}`
                        : receiver.profile_url
                    }
                    alt="user"
                    className="rounded-full h-14 w-14 object-cover "
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{receiver.username}</h3>
                  <h4>Typing...</h4>
                </div>
              </div>
              <div className="flex gap-10 xs:gap-6">
                <IoMdCall
                  className="text-white text-2xl hover:scale-125 transition-all cursor-pointer"
                  onClick={handleCallPopup}
                />
                <FaVideo
                  className="text-white text-2xl hover:scale-125 transition-all cursor-pointer"
                  onClick={handleCallPopup}
                />
              </div>
            </div>
          </div>
          <ReactScrollToBottom className="chat-body  px-6 xs:px-3 h-[70vh]">
            <div>
              {messages.map((content, key) => {
                return (
                  content._id === receiver._id && (
                    <div className="chat chat-end">
                      <div className="chat-bubble text-white bg-[#9195de] my-1 text-right">
                        {content.text}
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </ReactScrollToBottom>
          <div className="flex items-center px-6 sm:px-2">
            <div className="bg-[#5c5fa1] text-white p-2 rounded-full cursor-pointer">
              <FaImage />
            </div>
          
             
             <InputEmoji
              background="#edecfb"
             
              value={message}
              onChange={handleChange}
              onEnter={handleSend}
        
            />
             
            
            <button
              className="py-1 px-3 rounded-lg bg-[#5c5fa1] text-white text-lg font-semibold hover:border-2 hover:border-[#5c5fa1] hover:bg-white hover:text-[#5c5fa1]"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 sm:hidden">
          <img src={logo} width={300} className="m-auto" alt="logo"/>
          <h1 className="font-bold text-3xl text-[#e20e70] text-center">
            Tap to start conversation!!
          </h1>
        </div>
      )}

      <Popup open={open} handlePopup={handlePopup} logo={logo} />

      <CallPopup open={callPopup} handlePopup={handleCallPopup} logo={logo} />
    </>
  );
};

export default ChatScreen;
