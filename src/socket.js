import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3001";

const socket = io(URL);
// Optionally, you can emit initial events or perform other socket operations here

export default socket;
