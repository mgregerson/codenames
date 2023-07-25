import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { SocketProvider } from "./context/socketContext";
import "./styles/index.css";
import socket from "./socket";
import { CardProvider } from "./context/cardContext";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "./styles/background.jpeg";

ReactDOM.render(
  <SocketProvider socket={socket}>
    <CardProvider>
      <div
        className="bg-cover bg-center inset-0 min-h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <App />
      </div>
    </CardProvider>
  </SocketProvider>,
  document.getElementById("root")
);

reportWebVitals();
