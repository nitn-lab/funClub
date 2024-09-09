 import React, { useState, useEffect, useRef } from "react";
import { FaImage } from "react-icons/fa6";
import InputEmoji from "react-input-emoji";
import ReactScrollToBottom from "react-scroll-to-bottom";
import logo from "../../assets/images/FUNCLUB logo.png";
import { IoMdCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import AgoraRTC from "agora-rtc-sdk-ng";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const ChatScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [callActive, setCallActive] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);

  // Agora RTC Client
  const rtc = useRef({
    client: AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }),
    localAudioTrack: null,
    localVideoTrack: null,
  }).current;

  const localContainer = useRef(null);

  useEffect(() => {
    const handleUserPublished = async (user, mediaType) => {
      try {
        await rtc.client.subscribe(user, mediaType);
        if (mediaType === "video") {
          const remoteContainer = document.createElement("div");
          remoteContainer.id = user.uid.toString();
          remoteContainer.style.width = "200px";
          remoteContainer.style.height = "200px";
          document.body.append(remoteContainer);
          user.videoTrack.play(remoteContainer);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      } catch (error) {
        console.error("Error in handleUserPublished:", error);
      }
    };

    rtc.client.on("user-published", handleUserPublished);

    return () => {
      rtc.client.off("user-published", handleUserPublished);
    };
  }, [rtc.client]);

  const startVideoCall = async () => {
    try {
      const appId = "9e2fe1379c2d4477aa2c02aaa0350bc"; // Replace with your Agora App ID
     // Replace with your Agora Token
      const channelName = "video_chat"; // Use a unique channel name
      const userId = JSON.parse(localStorage.getItem("receiver"))._id;

      setCallActive(true);
      
      // Initialize Agora client and join the channel
      await rtc.client.join(appId, channelName, null, userId);
      
      // Create and publish local audio and video tracks
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      rtc.localVideoTrack.play(localContainer.current);
      await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

      // Automatically end the call after 1 minute if not answered
      setTimeout(() => {
        if (callActive) {
          endVideoCall();
        }
      }, 60000);
    } catch (error) {
      console.error("Failed to start video call", error);
      endVideoCall();
    }
  };

  const toggleMuteAudio = async () => {
    if (rtc.localAudioTrack) {
      await rtc.localAudioTrack.setEnabled(!audioMuted);
      setAudioMuted(!audioMuted);
    }
  };

  const toggleMuteVideo = async () => {
    if (rtc.localVideoTrack) {
      await rtc.localVideoTrack.setEnabled(!videoMuted);
      if (videoMuted) {
        rtc.localVideoTrack.play(localContainer.current);
      }
      setVideoMuted(!videoMuted);
    }
  };

  const endVideoCall = async () => {
    try {
      await rtc.client.leave();
      if (rtc.localAudioTrack) rtc.localAudioTrack.close();
      if (rtc.localVideoTrack) rtc.localVideoTrack.close();
      setCallActive(false);
    } catch (error) {
      console.error("Failed to end video call", error);
    }
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
    <>
      {receiver ? (
        <div className="chat-screen w-full">
          <div className="header bg-gradient-to-tl from-violet-500 to-pink-500 text-white px-10 py-2.5 xs:px-5">
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
          <ReactScrollToBottom className="chat-body xs:bg-gradient-to-tr from-violet-500 to-pink-500 px-6 xs:px-3 h-[calc(100vh-35vh)]">
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
          </ReactScrollToBottom>
          <div className="flex items-center px-6 sm:px-2">
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
          {callActive && (
            <div className="video-call-container fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div ref={localContainer} className="local-video w-full h-full" />
              <p className="calling-text absolute top-20 left-1/2 text-white">Calling....</p>
              <button onClick={toggleMuteAudio} className="absolute bottom-10 bg-white left-1/3 text-black py-2 px-4 rounded-full">
                {audioMuted ? <MicOffIcon /> : <MicIcon />}
              </button>
              <button onClick={toggleMuteVideo} className="absolute bottom-10 bg-white left-2/3 text-black py-2 px-4 rounded-full">
                {videoMuted ? <VideocamOffIcon /> : <VideocamIcon />}
              </button>
              <button
                className="absolute bottom-10 bg-red-500 text-white py-2 px-4 rounded-full"
                onClick={endVideoCall}
              >
                End Call
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-6 sm:hidden">
           <img src={logo} width={300} className="m-auto" alt="logo" />
          <h1 className="font-bold text-3xl text-white text-center">
            Tap to start conversation!!
          </h1>
        </div>
      )}
    </>
  );
};

export default ChatScreen;