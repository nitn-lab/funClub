import React, { useState, useRef } from 'react';
import InputEmoji from 'react-input-emoji';
import { FaImage } from 'react-icons/fa6'
import ReactScrollToBottom from 'react-scroll-to-bottom';
import logo from '../../assets/images/FUNCLUB logo.png';
import { IoMdCall } from 'react-icons/io';
import { FaVideo } from 'react-icons/fa';
import CallingInterface from './CallingInterface';

const ChatScreen = ({showChatScreen}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [callActive, setCallActive] = useState(false);
  const localContainer = useRef(null);

  const startVideoCall = () => {
    setCallActive(true);
  };

  const endVideoCall = () => {
    setCallActive(false);
  };

  const handleChange = (message) => {
    setMessage(message);
  };

  const handleSend = () => {
    setMessages([...messages, { text: message, _id: JSON.parse(localStorage.getItem("receiver"))._id }]);
    setMessage("");
  };

  const receiver = JSON.parse(localStorage.getItem("receiver"));

  return (
    <div className={`flip-container relative w-full h-full`}>
      <div className={`flip-card relative w-full h-full transition-transform duration-500 ${callActive ? 'flip' : ''}`}>
        <div className="front absolute top-0 left-0 w-full h-full  text-white">
          {receiver ? (
            <div className="chat-screen relative w-full bg-fuchsia-400 h-[96vh] rounded-md shadow-lg">
              <div className="header bg-fuchsia-800 text-white px-10 py-2.5 xs:px-5 rounded-t-md">
                <div className="flex justify-between items-center">
                  <div className="flex gap-5 items-center xs:gap-3">
                    <div>
                      <img
                        src={`receiver.profile_url || https://avatar.iran.liara.run/username?username=${receiver.firstname}+${receiver.lastname}`}
                        alt="user"
                        className="rounded-full h-12 w-12 xs:h-12 xs:w-12 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg xs:text-base">{receiver.username}</h3>
                      <h4>Typing...</h4>
                    </div>
                  </div>
                  <div className="flex gap-10 xs:gap-6">
                    <IoMdCall
                      className="text-white text-2xl hover:scale-125 transition-all cursor-pointer"
                      onClick={() => alert("Voice call not implemented yet")}
                    />
                    <button onClick={startVideoCall}>
                      <FaVideo className="text-white text-2xl hover:scale-125 transition-all" />
                    </button>
                  </div>
                </div>
              </div>
              <ReactScrollToBottom className="chat-body 
               px-6 xs:px-3 h-full">
                <div>
                  {messages.map((content, key) => (
                    content._id === receiver._id && (
                      <div key={key} className="chat chat-end">
                        <div className="chat-bubble text-white bg-fuchsia-800 my-1 text-right">
                          {content.text}
                        </div>
                      </div>
                    )
                  ))}
                </div>
                <div className={`absolute w-[93%] ${!showChatScreen ? "bottom-40" : "bottom-28"}`}>
                <div className="flex items-center ">
                  <div className="bg-fuchsia-800 text-white p-2 rounded-full cursor-pointer">
                    <FaImage />
                  </div>
                  <InputEmoji
                    background="#edecfb"
                    value={message}
                    onChange={handleChange}
                    onEnter={handleSend}
                  />
                  <button
                    className="py-1 px-3 rounded-lg bg-fuchsia-800 text-white text-lg font-semibold hover:border-2 hover:border-fuchsia-800 hover:bg-white hover:text-fuchsia-800"
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
              </div>
              </ReactScrollToBottom>
             
            </div>
          ) : (
            <div className="p-6 sm:hidden">
              <img src={logo} width={300} className="m-auto" alt="logo" />
              <h1 className="font-bold text-3xl text-white text-center">
                Tap to start conversation!!
              </h1>
            </div>
          )}
        </div>
        <div className={`back transition-transform duration-500 ${callActive ? 'transform rotate-y-180' : ''}`}>
          <CallingInterface endVideoCall={endVideoCall} />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;