import "./App.css";
import { useEffect, useState, useContext } from "react";
import React from "react";
import CardList from "../CardList/CardList.tsx";
import { useCardContext } from "../../context/cardContext";
import { SocketContext } from "../../context/socketContext";
import TeamSelect from "../PlayerRegistration/PlayerRegistration";
import PlayerRegistration from "../PlayerRegistration/PlayerRegistration";

function App() {
  const cards = useCardContext();
  const socket = useContext(SocketContext);
  const [player, setPlayer] = useState({});
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [guesses, setGuesses] = useState([]);

  console.log("THE PLAYER IN APP IS", player);
  console.log("THE PLAYERS IN APP IS", players);
  console.log("THE TEAMS IN APP IS", teams);

  useEffect(() => {
    // Handle player joining event
    socket.on("playerJoined", (newPlayerName) => {
      setPlayers((prevPlayers) => [...prevPlayers, newPlayerName]);
    });

    socket.on("teamUpdate", (redTeam, blueTeam) => {
      setTeams({ redTeam, blueTeam });
    });

    // Handle player leaving event
    // Handle player leaving event
    socket.on("playerLeft", (playerName) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((name) => name !== playerName)
      );
    });

    // Handle guess made event
    socket.on("guessMade", (guess) => {
      setGuesses((prevGuesses) => [...prevGuesses, guess]);
    });

    // Cleanup socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleJoinGame = () => {
    // Emit join event to the server
    socket.emit("join", player);
  };

  function handlePlayerRegistration(data) {
    setPlayer(data);
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.name !== data.playerName)
    );
    handleTeamSelect(data.team, data.role, data.playerName);
    console.log(data);
  }

  const handleTeamSelect = (team, role, name) => {
    // Emit joinTeam event to the server
    socket.emit("joinTeam", team, role, name);
  };

  const handleMakeGuess = (guess) => {
    // Emit makeGuess event to the server
    socket.emit("makeGuess", guess);
  };

  return (
    <div className="App">
      <PlayerRegistration handlePlayerRegistration={handlePlayerRegistration} />
      {cards && <CardList cards={cards} />}
    </div>
  );
}

export default App;
