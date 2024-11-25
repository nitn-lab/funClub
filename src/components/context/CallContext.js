// import React, { createContext, useState, useContext, useEffect } from "react";

// const CallContext = createContext();

// export const CallProvider = ({ socket, children }) => {
//   const [incomingCall, setIncomingCall] = useState(null);

//   useEffect(() => {
//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);

//       if (message.type === "incomingCall" && message.from) {
//         setIncomingCall(message); // Set global incoming call
//       }
//     };

//     return () => {
//       socket.onmessage = null; // Cleanup
//     };
//   }, [socket]);

//   return (
//     <CallContext.Provider value={{ incomingCall, setIncomingCall }}>
//       {children}
//     </CallContext.Provider>
//   );
// };

// export const useCall = () => useContext(CallContext);



import React, { createContext, useContext, useState } from "react";

const CallContext = createContext({
  callState: null,
  incomingCall: null,
  setCallState: () => {},
  setIncomingCall: () => {},
  acceptCall: () => {},
  rejectCall: () => {},
});

export const useCallContext = () => useContext(CallContext);

export const CallProvider = ({ children }) => {
  const [incomingCall, setIncomingCall] = useState(null);
  const [callState, setCallState] = useState("idle");

  const acceptCall = () => {
    setCallState("active");
  };

  const rejectCall = () => {
    setCallState("idle");
    setIncomingCall(null);
  };

  return (
    <CallContext.Provider
      value={{
        incomingCall,
        callState,
        setIncomingCall,
        setCallState,
        acceptCall,
        rejectCall,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

