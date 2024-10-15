// WebSocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CreateWebSocketConnection } from '../../services/websocket';

// Create WebSocket Context
const WebSocketContext = createContext();

// WebSocket Provider Component
export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const handleIncomingMessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log("Message received:", receivedData);
      // Handle incoming messages here
    };

    const ws = CreateWebSocketConnection(handleIncomingMessage);
    setSocket(ws);

    // Cleanup WebSocket on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom Hook to use WebSocket Context
export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
