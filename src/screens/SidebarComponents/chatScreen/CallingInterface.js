import React, { useState, useRef, useEffect } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from "axios";
import {
  CreateWebSocketConnection,
  sendMessage,
} from "../../../services/websocket";

const CallingInterface = ({ appId, channelName, endVideoCall, socket }) => {
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [localTracks, setLocalTracks] = useState({ audio: null, video: null });
  const localContainer = useRef(null);
  const client = useRef(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  ).current;
  const receiver = JSON.parse(localStorage.getItem("receiver"));
  const senderId = localStorage.getItem("id");
  const [isCalling, setIsCalling] = useState(false); // Track if currently in a call
  const [incomingCall, setIncomingCall] = useState(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [initiatedEndCall, setInitiatedEndCall] = useState(false);
  const [callingSound, setCallingSound] = useState(null);
  console.log("chl", channelName);
  // Function to fetch Agora token
  const generateAgoraToken = async () => {
    try {
      const response = await axios.get(
        `https://backendapifunclub.yourwebstore.org.in/api/v1/generate-token?channelName=${channelName}`
      );
      return response.data.token;
    } catch (error) {
      console.error("Error generating token:", error);
      return null;
    }
  };

  // Function to set up audio and video tracks
  const setupAudioVideoTracks = async () => {
    try {
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
        AEC: true, // Acoustic Echo Cancellation
        ANS: true, // Automatic Noise Suppression
        AGC: true, // Automatic Gain Control
      });
      const videoTrack = await AgoraRTC.createCameraVideoTrack();

      audioTrack.setVolume(100); // Ensure audio volume is set
      videoTrack.play(localContainer.current); // Play local video

      setLocalTracks({ audio: audioTrack, video: videoTrack });
      return [audioTrack, videoTrack];
    } catch (error) {
      console.error("Error setting up audio/video tracks:", error);
    }
  };

  // Initialize Agora
  const initAgora = async () => {
    const appId = "d284507a049d47c39044f072f77f8d5b";
    const channelName = "abcd";
    const token = await generateAgoraToken();

    if (!token) {
      console.error("Token is not available.");
      return;
    }

    try {
      await client.join(appId, channelName, token);

      const [audioTrack, videoTrack] = await setupAudioVideoTracks();
      if (audioTrack && videoTrack) {
        await client.publish([audioTrack, videoTrack]);
      }
    } catch (error) {
      console.error("Failed to join channel or create tracks:", error);
    }
  };

  useEffect(() => {
    // const sound = new Audio('C:\Users\Granth\Desktop\FUNCLUB\FRONTEND\funClub\src\screens\SidebarComponents\chatScreen\ring-tone-68676.mp3'); // Path to your calling sound file
    //   const sound = new Audio();
    // sound.src = './ring-tone-68676.mp3'; // Path to .mp3 file
    // sound.type = 'audio/mpeg';
      
    //   setCallingSound(sound);

    //   console.log("socket", socket);

    const sound = new Audio("/ring-tone-68676.mp3");
    sound.loop = true;
    sound.volume = 1.0;

    sound
      .play()
      .then(() => {
        console.log("Audio is playing");
        initiateCall();
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
      
    return () => {
      sound.pause();
      sound.currentTime = 0;
    };
   
    //  // Initialize WebSocket connection with onMessage handler
    //  const websocket = CreateWebSocketConnection((messageData) => {
    //   // Handle incoming messages based on their type
    //   console.log("messsggg", messageData);
    //   switch (messageData.type) {
    //     case "incomingCall":
    //       // Show incoming call UI, etc.
    //       break;
    //     case "callAccepted":
    //       // Start Agora setup
    //       break;
    //     case "callEnded":
    //       // Handle end call
    //       endVideoCall();
    //       break;
    //     default:
    //       console.log("Unhandled WebSocket message type:", messageData.type);
    //   }
    // });
    // socket.current.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   console.log("message", message);
    // };

    // return () => {
    //   // Clean up tracks and leave the channel on component unmount
    //   if (localTracks.audio) localTracks.audio.close();
    //   if (localTracks.video) localTracks.video.close();

    //   client
    //     .leave()
    //     .then(() => console.log("Left the channel successfully"))
    //     .catch((error) => console.error("Failed to leave the channel:", error));
    // };
  }, []);

  useEffect(() => {
    // Listen for incoming call messages
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);

      if (message.type === "incomingCall" && message.from) {
        // Display incoming call UI
        setIncomingCall(message);
      } else if (message.type === "callEnded") {
        endVideoCall();
      }
    };

    return () => {
      if (localTracks.audio) localTracks.audio.close();
      if (localTracks.video) localTracks.video.close();
      client.leave();
    };
  }, [hasEnded]);

  const initiateCall = () => {
    if (isCalling) {
      console.log(
        "Call is already initiated. Ignoring duplicate call request."
      );
      return; // Prevent multiple calls
    }

    setIsCalling(true); // Mark as calling

    if (callingSound) {
      callingSound.loop = true; // Set loop for continuous play
      callingSound.volume = 1.0;
      callingSound
        .play()
        .catch((error) => console.error("Error playing calling sound:", error));
    }

    const userId = localStorage.getItem("id");
    const message = {
      type: "call",
      from: userId,
      to: receiver._id,
    };
    console.log("Initiating call with message:", message);
    sendMessage(socket, message); // Send call initiation message

    initAgora();
  };

  const endCall = () => {
    if (hasEnded) {
      console.log("Call already ended. Ignoring further end requests.");
      return;
    } // Exit if the call has already ended

    setHasEnded(true);
    if (!initiatedEndCall) {
      const userId = localStorage.getItem("id");
      const message = {
        type: "endCall",
        from: userId,
        to: receiver._id,
      };
      console.log("Ending call with message:", message);
      sendMessage(socket, message);
      setInitiatedEndCall(true);
    }

    // Close tracks and leave channel
    if (localTracks.audio) {
      localTracks.audio.stop();
      localTracks.audio.close();
      setLocalTracks((prev) => ({ ...prev, audio: null }));
    }
    if (localTracks.video) {
      localTracks.video.stop();
      localTracks.video.close();
      setLocalTracks((prev) => ({ ...prev, video: null }));
    }

    client
      .leave()
      .then(() => console.log("Left the Agora channel successfully"))
      .catch((error) => console.error("Failed to leave the channel:", error));

    setIsCalling(false);

    endVideoCall();
  };

  const acceptCall = () => {
    if (incomingCall) {
      sendMessage(socket, {
        type: "callAccepted",
        from: senderId,
        to: incomingCall.from,
      });
      initAgora(incomingCall.channelName);
      setIncomingCall(null); // Reset incoming call state

      if (callingSound) {
        callingSound.stop();
      }
    }
  };

  const rejectCall = () => {
    if (incomingCall) {
      sendMessage(socket, {
        type: "callRejected",
        from: senderId,
        to: incomingCall.from,
      });
      setIncomingCall(null); // Reset incoming call state

      if (callingSound) {
        callingSound.stop();
      }
    }
  };

  const toggleMuteAudio = () => {
    if (localTracks.audio) {
      const newMuteState = !audioMuted;
      localTracks.audio.setMuted(newMuteState);
      setAudioMuted(newMuteState);
    }
  };

  const toggleMuteVideo = () => {
    if (localTracks.video) {
      const newMuteState = !videoMuted;
      localTracks.video.setMuted(newMuteState);
      setVideoMuted(newMuteState);
    }
  };

  return (
    <div className="relative w-full h-[100vh] bg-black text-white mx-auto bg-opacity-75">
      {incomingCall && (
        <div className="incoming-call">
          <p>Incoming call from {incomingCall.from}</p>
          <button onClick={acceptCall}>Accept</button>
          <button onClick={rejectCall}>Reject</button>
        </div>
      )}
      {/* Display Local Video */}
      <div className="flex justify-center">
        <div className="w-80 h-80 bg-gray-900" ref={localContainer}>
          {!localTracks.video && (
            <p className="text-center text-white mt-32">Loading video...</p>
          )}
        </div>
      </div>
      {/* <div>
        <button onClick={initiateCall}>Initiate Call</button>
        {/* Additional UI for call controls */}
      {/* </div> */}
      <p className="text-lg text-center pt-10">In Call...</p>

      {/* Control Buttons */}
      <div className="flex justify-center">
        <div className="flex gap-10 justify-between absolute bottom-28">
          <button
            onClick={toggleMuteAudio}
            className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200"
          >
            {audioMuted ? <MicOffIcon /> : <MicIcon />}
          </button>

          <button
            onClick={endCall}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
          >
            End Call
          </button>

          <button
            onClick={toggleMuteVideo}
            className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200"
          >
            {videoMuted ? <VideocamOffIcon /> : <VideocamIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallingInterface;

// import React, { useState, useRef } from "react";
// import MicIcon from "@mui/icons-material/Mic";
// import MicOffIcon from "@mui/icons-material/MicOff";
// import VideocamIcon from "@mui/icons-material/Videocam";
// import VideocamOffIcon from "@mui/icons-material/VideocamOff";

// const CallingInterface = ({ endVideoCall }) => {
//   const [audioMuted, setAudioMuted] = useState(false);
//   const [videoMuted, setVideoMuted] = useState(false);
//   const [isInCall, setIsInCall] = useState(false);

//   const localContainer = useRef(null);

//   const toggleMuteAudio = () => {
//     setAudioMuted(!audioMuted);
//   };

//   const toggleMuteVideo = () => {
//     setVideoMuted(!videoMuted);
//   };

//   return (
//     <div className="relative w-full h-[100vh] bg-black text-white mx-auto bg-opacity-75">
//       <p className="text-lg text-center pt-10">Calling...</p>
//       <div className="flex justify-center">
//         <div className="flex gap-10 justify-between absolute  bottom-28">
//           <button
//             onClick={toggleMuteAudio}
//             className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200"
//           >
//             {audioMuted ? <MicOffIcon /> : <MicIcon />}
//           </button>

//           <button
//             onClick={endVideoCall}
//             className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600"
//           >
//             End Call
//           </button>
//           <button
//             onClick={toggleMuteVideo}
//             className="bg-white text-black py-2 px-4 rounded-full hover:bg-gray-200"
//           >
//             {videoMuted ? <VideocamOffIcon /> : <VideocamIcon />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CallingInterface;
