import "./App.css";
import { useEffect, useState, useContext, useRef } from "react";
import React from "react";
import CardList from "../CardList/CardList.tsx";
import { useCardContext } from "../../context/cardContext";
import { SocketContext } from "../../context/socketContext";
import GameContainer from "../GameContainer/GameContainer";
import codenamesApi from "../../utils/api";
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
  const [newCards, setNewCards] = useState([]);

  console.log(guesses, "THE guesses in app");
  console.log(currTeam, "currTeam");

  useEffect(() => {
    async function getCards() {
      const allCards = await codenamesApi.getCardsForGame();
      setNewCards(allCards);
    }
    getCards();
  }, []);

  useEffect(() => {
    // Handle player joining event
    socket.on("playerJoined", (newPlayerName) => {
      setPlayers((prevPlayers) => [...prevPlayers, newPlayerName]);
    });

    socket.on("teamUpdate", (teams) => {
      setTeams(teams);
    });

    // Handle player leaving event
    // Handle player leaving event
    socket.on("playerLeft", (playerName) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((name) => name !== playerName)
      );
    });

    // Handle guess made event
    socket.on("guessMade", (updatedCards, teams) => {
      setGuesses(updatedCards);
      setTeams(teams);
      checkForWinner(updatedCards, teams);
    });

    socket.on("gameStarted", (items) => {
      setCurrTeam("blue");
      setGuesses(items);
    });

    if (socket) {
      handleJoinGame();
    }

    // Cleanup socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  function checkForWinner(cards, teams) {
    if (teams.red.score === 7) {
      console.log("red team wins!");
    } else if (teams.blue.score === 8) {
      console.log("blue team wins!");
    } else {
      // update current team to other team
      setCurrTeam((prevCurrTeam) => (prevCurrTeam === "blue" ? "red" : "blue"));
    }
  }

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
  }

  function startGame() {
    // Emit start game event to the server
    socket.emit("startGame", cards);
  }

  const handleTeamSelect = (team, role, name) => {
    // Emit joinTeam event to the server
    socket.emit("joinTeam", team, role, name);
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
          currTeam={currTeam}
          teams={teams}
          startGame={startGame}
        />
      )}
    </div>
  );
}

export default App;
