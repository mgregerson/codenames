import "./App.css";
import { useEffect, useState, useContext } from "react";
import React from "react";
import CardList from "../CardList/CardList.tsx";
import { useCardContext } from "../../context/cardContext";
import { SocketContext } from "../../context/socketContext";
import GameContainer from "../GameContainer/GameContainer";
import PlayerRegistration from "../PlayerRegistration/PlayerRegistration";
import StartGame from "../StartGame/StartGame";
import { set } from "react-hook-form";

function App() {
  const cards = useCardContext();
  const socket = useContext(SocketContext);
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [currTeam, setCurrTeam] = useState(null);

  console.log("THE PLAYER IN APP IS", player);
  console.log("THE PLAYERS IN APP IS", players);
  console.log("THE TEAMS IN APP IS", teams);
  console.log("THE GUESSES IN APP IS", guesses);

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
    socket.on("guessMade", (updatedCards) => {
      setGuesses(updatedCards);
    });

    socket.on("startGame", () => {
      console.log("game started");
    });

    if (socket) {
      handleJoinGame();
    }

    // Cleanup socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  function handleJoinGame() {
    // Emit join event to the server
    socket.emit("join", socket.id);
  }

  function handlePlayerRegistration(data) {
    setPlayer(data);
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.name !== data.playerName)
    );
    handleTeamSelect(data.team, data.role, data.playerName);
    console.log(data);
  }

  function startGame() {
    // Emit start game event to the server
    socket.emit("startGame");
    setCurrTeam("blue");
  }

  const handleTeamSelect = (team, role, name) => {
    // Emit joinTeam event to the server
    socket.emit("joinTeam", team, role, name);
  };

  const handleGuess = (word, team) => {
    // Emit makeGuess event to the server
    socket.emit("makeGuess", word, team, cards);
  };

  return (
    <div className="App">
      {player === null ? (
        <PlayerRegistration
          handlePlayerRegistration={handlePlayerRegistration}
        />
      ) : (
        <GameContainer
          player={player}
          cards={cards}
          guesses={guesses}
          handleGuess={handleGuess}
          teams={teams}
          startGame={startGame}
        />
      )}
    </div>
  );
}

export default App;
