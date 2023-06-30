import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

    newSocket.on("connect", () => {
      setSocket(newSocket);
      setLoading(false);
    });

    newSocket.on("connect_error", (error) => {
      // Handle connection error
      console.error("Socket connection error:", error);
      setLoading(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
