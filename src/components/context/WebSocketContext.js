// import React, { createContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// export const WebSocketContext = createContext();

// const WebSocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');

//     if (token) {
//       const newSocket = io('ws://backendapifunclub.yourwebstore.org.in:4000', {
//         query: { token },
//       });

//       newSocket.on('connect', () => {
//         console.log('Connected to WebSocket server');
//       });

//       newSocket.on('message', (message) => {
//         const data = JSON.parse(message);
//         if (data.type === 'chatMessage') {
//           setMessages((prevMessages) => [...prevMessages, data]);
//         }
//       });

//       setSocket(newSocket);

//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, []);

//   return (
//     <WebSocketContext.Provider value={{ socket, messages }}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// export default WebSocketProvider;