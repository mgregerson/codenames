import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { SocketProvider } from "./context/socketContext";
import socket from "./socket";
import { CardProvider } from "./context/cardContext";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <SocketProvider socket={socket}>
    <CardProvider>
      <App />
    </CardProvider>
  </SocketProvider>,
  document.getElementById("root")
);

reportWebVitals();
