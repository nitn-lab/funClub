import React, { useState, useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { FaImage } from "react-icons/fa6";
import ReactScrollToBottom from "react-scroll-to-bottom";
import logo from "../../assets/images/FUNCLUB logo.png";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import CallingInterface from "./CallingInterface";
import { sendMessage } from "../../../services/websocket";
import { SignalCellularConnectedNoInternet1BarOutlined } from "@mui/icons-material";

const ChatScreen = ({ showChatScreen, socket }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [callActive, setCallActive] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // To track typing status
  const receiver = JSON.parse(localStorage.getItem("receiver"));
  const senderId = localStorage.getItem("id");

  // Log receiver and sender for debugging
  console.log("Receiver ID:", receiver._id);
  console.log("Sender ID:", senderId);

  // Handle receiving messages from WebSocket
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log("Received message:", newMessage);

        // Only add messages relevant to the current conversation
        if (
          (newMessage.from === senderId && newMessage.to === receiver._id) ||
          (newMessage.from === receiver._id && newMessage.to === senderId)
        ) {
          setChatMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            console.log("Updated chatMessages:", updatedMessages);
            return updatedMessages;
          });
        }
      };
    }
  }, [socket, senderId, receiver._id]);

  const handleTyping = () => {
    if (socket) {
      const typingData = {
        type: "typing",
        from: senderId,
        to: receiver._id,
      };
      sendMessage(socket, typingData);
    }
  };

  const handleStopTyping = () => {
    if (socket) {
      const stopTypingData = {
        type: "stopTyping",
        from: senderId,
        to: receiver._id,
      };
      sendMessage(socket, stopTypingData);
    }
  };

  const handleSend = () => {
    if (message && socket) {
      const messageData = {
        type: "chatMessage",
        from: senderId,
        to: receiver._id,
        chatMessage: message,
      };

      // Send message using the WebSocket connection
      sendMessage(socket, messageData);
      console.log("sending message:", messageData);
      setChatMessages((prevMessages) => [...prevMessages, messageData]); // Add sent message locally
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className={`flip-container relative w-full h-full`}>
      <div
        className={`flip-card relative w-full h-full transition-transform duration-500 ${
          callActive ? "flip" : ""
        }`}
      >
        <div className="front absolute top-0 left-0 w-full h-full text-white">
          {receiver ? (
            <div className="chat-screen relative w-full bg-fuchsia-400 h-[100vh]">
              <div className="header bg-fuchsia-800 text-white px-10 py-2.5 xs:px-5">
                <div className="flex justify-between items-center">
                  <div className="flex gap-5 items-center xs:gap-3">
                    <div>
                      <img
                        src={receiver.profileImage}
                        alt="user"
                        className="rounded-full h-12 w-12 xs:h-12 xs:w-12 object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg xs:text-base">
                        {receiver.username}
                      </h3>
                      <h4>Typing...</h4>
                    </div>
                  </div>
                  <div className="flex gap-10 xs:gap-6">
                    <IoMdCall
                      className="text-white text-2xl hover:scale-125 transition-all cursor-pointer"
                      onClick={() => alert("Voice call not implemented yet")}
                    />
                    <button onClick={() => setCallActive(true)}>
                      <FaVideo className="text-white text-2xl hover:scale-125 transition-all" />
                    </button>
                  </div>
                </div>
              </div>

              <ReactScrollToBottom className="chat-body px-6 xs:px-3 h-full">
                <div>
                  {chatMessages.map(
                    (content, key) =>
                      // console.log("m", content),
                      {
                        if (
                          (content.to === receiver._id &&
                            content.from === senderId) ||
                          (content.from === receiver._id &&
                            content.to === senderId)
                        ) {
                          return (
                            <div
                              key={key}
                              className={`chat ${
                                content.from === senderId
                                  ? "chat-end"
                                  : "chat-start"
                              }`}
                            >
                              <div className="chat-bubble text-white bg-fuchsia-800 my-1">
                                {content.message || content.chatMessage}
                              </div>
                            </div>
                          );
                        }
                      }
                    // content.to === receiver._id  &&(
                    //   <div
                    //     key={key}
                    //     className={`chat ${
                    //       content.from === senderId
                    //         ? "chat-end"
                    //         : "chat-start"
                    //     }`}
                    //   >
                    //     <div className="chat-bubble text-white bg-fuchsia-800 my-1">
                    //       {content.message || content.chatMessage}
                    //     </div>
                    //   </div>
                    // )
                  )}
                </div>

                <div
                  className={`absolute w-[93%] ${
                    !showChatScreen ? "bottom-44" : "bottom-28"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="bg-fuchsia-800 text-white p-2 rounded-full cursor-pointer">
                      <FaImage />
                    </div>
                    <InputEmoji
                      background="#edecfb"
                      value={message}
                      onChange={setMessage}
                      onEnter={handleSend}
                      // onKeyDown={handleTyping} // Detect typing
                      // onKeyUp={handleStopTyping}
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

        <div
          className={`back transition-transform duration-500 ${
            callActive ? "transform rotate-y-180" : ""
          }`}
        >
          <CallingInterface endVideoCall={() => setCallActive(false)} />
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
