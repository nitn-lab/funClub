import React from "react";
import { useCall } from "../components/context/CallProvider";

const GlobalNotification = ({ initAgora }) => {
  const { incomingCall, setIncomingCall } = useCall();

  const acceptCall = () => {
    if (incomingCall) {
      // Handle accepting the call
      initAgora(incomingCall.channelName);
      setIncomingCall(null); // Clear the notification
    }
  };

  const rejectCall = () => {
    if (incomingCall) {
      // Handle rejecting the call
      setIncomingCall(null); // Clear the notification
    }
  };

  return (
    incomingCall && (
      <div className="global-notification">
        <p>Incoming call from {incomingCall.from}</p>
        <button onClick={acceptCall}>Accept</button>
        <button onClick={rejectCall}>Reject</button>
      </div>
    )
  );
};

export default GlobalNotification;
