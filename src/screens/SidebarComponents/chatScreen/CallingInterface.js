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
import { useCallContext } from "../../../components/context/CallContext";

const CallingInterface = ({
  appId,
  channelName,
  endVideoCall,
  socket,
  data,
  callType,
  user,
}) => {
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
  // const [incomingCall, setIncomingCall] = useState(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [initiatedEndCall, setInitiatedEndCall] = useState(false);
  const [callingSound, setCallingSound] = useState(null);
  const [remoteVideo, setRemoteVideo] = useState(false);
  // const {callStatus, setCallStatus} = useCallStatus()
  let ringtoneRef = useRef(null);
  console.log("socket from callng interfae", socket);
  const [ringtone, setRingtone] = useState(false)
  // Function to fetch Agora token
  const {incomingCall, setIncomingCall, callStatus, setCallStatus} = useCallContext();
  console.log(incomingCall, "ppppppppppppppppppppppppppppppppppppppppppppppppppppppp")
  useEffect(() => {
    return () => {
   
      if (localTracks.audio) localTracks.audio.close();
      if (localTracks.video) localTracks.video.close();
      client
        .leave()
        .then(() => console.log("Cleanup: Left the Agora channel"))
        .catch((error) =>
          console.error("Cleanup: Error leaving the channel", error)
        );
    };
  }, []);

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

  useEffect(() => {
    // startRingtone();
    if (user === "caller") {
      // startRingtone()
      initiateCall();
    } else {
      // ringtoneRef.current = new Audio("/ring-tone-68676.mp3");
      acceptCall(socket);
    }
  }, []);

  useEffect(() => {
    // Listen for incoming call messages
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message: calinginter", message, message.type);

      if (message.type === "incomingCall" && message.from) {
        // Display incoming call UI
        setIncomingCall(message);
        // initAgora(false);
      } else if (message.type === "callEnded") {
        // stopRingtone()
        endCall();
      } else if (message.type === "callAccepted"){
         setCallStatus(true)
        // stopRingtone();
         
      }
    };

    return () => {
      if (localTracks.audio) localTracks.audio.close();
      if (localTracks.video) localTracks.video.close();
      client.leave();
    };
  }, [hasEnded]);

   const startRingtone = () => {
    if(!ringtoneRef.current)
     {ringtoneRef.current = new Audio("/ring-tone-68676.mp3");
     ringtoneRef.current.loop = true;
     }
     ringtoneRef.current.play();
   };

   const stopRingtone = () => {
      if (ringtoneRef.current) {
        console.log(ringtoneRef.current, "ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt")
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0; // Reset audio playback to the start
      ringtoneRef.current = null;
    }
    console.log("Ringtone stopped.");
  };

  const initiateCall = () => {
    setRingtone(true)
     startRingtone();
   
    if (isCalling) {
      console.log(
        "Call is already initiated. Ignoring duplicate call request."
      );
      return; // Prevent multiple calls
    }

    //  startRingtone();
    setIsCalling(true); // Mark as calling
    const userId = localStorage.getItem("id");
    const message = {
      type: "call",
      from: userId,
      to: receiver._id,
    };
    console.log("Initiating call with message:", message);
    sendMessage(socket, message); // Send call initiation message
    // stopRingtone()
    initAgora(true);
  };

  // Initialize Agora
  const initAgora = async (isInitiator) => {
    const appId = "d284507a049d47c39044f072f77f8d5b";
    const channelName = "abcd";
    const token = await generateAgoraToken();
    if (!token) {
      console.error("Token is not available.");
      return;
    }

    try {
      await client.join(appId, channelName, token);

      if (isInitiator) {
        // Step 2: If the user is the caller, publish their tracks
        const [audioTrack, videoTrack] = await setupAudioVideoTracks();
        if (audioTrack && videoTrack) {
          await client.publish([audioTrack, videoTrack]);
          console.log("Published local tracks as initiator.");
          setCallingSound(false);
        }
      } else {
        // Step 2: If the user is the receiver, subscribe to the caller's tracks
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType); // Subscribe to the caller's tracks
          console.log(`Subscribed to user ${user.uid}'s ${mediaType} track`);
          
          if (mediaType === "video") {
            const remoteContainer = document.createElement("div");
            remoteContainer.id = user.uid.toString();
            remoteContainer.style.width = "100%";
            remoteContainer.style.height = "100%";
            localContainer.current.appendChild(remoteContainer);
            user.videoTrack.play(remoteContainer); // Play remote video
            setRemoteVideo(true);
            console.log(remoteContainer, "ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
          }
          setCallingSound(false);
          // stopRingtone();
         
          if (mediaType === "audio") {
            user.audioTrack.play(); // Play remote audio
          }
        });
        // stopRingtone();
        console.log("Receiver is ready to subscribe to tracks.");
      }
    } catch (error) {
      console.error("Failed to join channel or create tracks:", error);
    }
  };
  const endCall = async () => {
    if (hasEnded) return; // Prevent duplicate end calls

    setHasEnded(true);
    setRingtone(false)
    stopRingtone()
    if (!initiatedEndCall) {
      const message = {
        type: "endCall",
        from: senderId,
        to: receiver._id,
      };
      sendMessage(socket, message);
      setInitiatedEndCall(true);
    }

    // Stop and close tracks
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

    // Leave the Agora channel
    try {
      await client.leave();
      console.log("Successfully left the Agora channel.");
    } catch (error) {
      console.error("Error leaving the Agora channel:", error);
    }

    setIsCalling(false);
    endVideoCall();
  };

  const acceptCall = (socket, sound) => {
    setCallStatus(true)
    if (data) {
    sendMessage(socket, {
      type: "acceptCall",
      from: senderId,
      to: data?.from,
    })
    setRingtone(false)
     stopRingtone();
  
    initAgora(false);

    setIncomingCall(null); // Reset incoming call state
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
      // stopRingtone()
      if (callingSound) {
        callingSound.stop();
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
    }
  };

  const toggleMuteAudio = () => {
    console.log(localTracks.audio, "audioooooooooooooooooooooooooooooooo")
    if (localTracks.audio) {
      const newMuteState = !audioMuted;
      localTracks.audio.setMuted(newMuteState);
      setAudioMuted(newMuteState);
    }
  };

  const toggleMuteVideo = () => {
    console.log(localTracks.video, "videooooooooooooooooooooooooooooooooooo")
    if (localTracks.video) {
      const newMuteState = !videoMuted;
      localTracks.video.setMuted(newMuteState);
      setVideoMuted(newMuteState);
    }
  };

  return (
    <div className="relative w-full h-[100vh] bg-black text-white mx-auto bg-opacity-75 z-20">
      {incomingCall && (
        <div className="incoming-call">
          <p>Incoming call from {incomingCall.from}</p>
          <button onClick={acceptCall}>Accept</button>
          <button onClick={rejectCall}>Reject</button>
        </div>
      )}
      <span className="text-lg text-center z-20 w-full pt-5 absolute">{

      }
        {callStatus ? "Connected" : "Calling..."}<span className=""></span>
      </span>
      
      <div className="flex justify-center relative w-full h-[100vh]">
        <div
          className=" flex justify-center absolute items-center w-full h-[100vh]"
          ref={localContainer}
        >
          {(!localTracks.video && remoteVideo === false) && 
            <p className="loading loading-spinner loading-md mx-auto"></p>
          }
        </div>
      </div>
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
            className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-500"
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


