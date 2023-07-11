import "./App.css";

import { useEffect, useState, useContext } from "react";
import React from "react";

import { useCardContext } from "../../context/cardContext";
import { SocketContext } from "../../context/socketContext";

import GameContainer from "../GameContainer/GameContainer";
import PlayerRegistration from "../GameSetup/PlayerRegistration/PlayerRegistration";
import DisplayWinner from "../DisplayWinner/DisplayWinner";

function App() {
  const cards = useCardContext();
  const socket = useContext(SocketContext);
  const [player, setPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [currTeam, setCurrTeam] = useState(null);
  const [winner, setWinner] = useState(null);
  const [currClue, setCurrClue] = useState({ clue: null, numGuesses: 0 });

  console.log(guesses, "THE guesses in app");
  console.log(player, "THE PLAYER");
  console.log(currTeam, "currTeam");
  console.log(teams, "THE TEAMS IN APP");
  console.log(currClue, "currClue in app");

  useEffect(() => {
    // Handle player joining event
    socket.on("playerJoined", (newPlayerName) => {
      setPlayers((prevPlayers) => [...prevPlayers, newPlayerName]);
    });

    socket.on("teamUpdate", (teams) => {
      setTeams(teams);
    });

    // Handle player leaving event
    socket.on("playerLeft", (playerName) => {
      setPlayers((prevPlayers) =>
        prevPlayers.filter((name) => name !== playerName)
      );
    });

    // Handle guess made event
    socket.on("guessMade", (updatedCards, teams, chosenWord, clueData) => {
      setGuesses(updatedCards);
      setTeams(teams);
      setCurrClue(clueData);
      console.log(clueData, "clueData in guessMade");
      // Delay the call to updateGameData to ensure state updates take effect
      setTimeout(() => {
        updateGameData(teams, chosenWord, clueData);
      }, 0);
    });

    socket.on("clue", (clue, numGuesses) => {
      setCurrClue((prevCurrClue) => ({ clue, numGuesses }));
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

  const handleTeamSelect = (team, role, name) => {
    // Emit joinTeam event to the server
    socket.emit("joinTeam", team, role, name);
  };

  function startGame() {
    // Emit start game event to the server
    socket.emit("startGame", cards);
  }

  function updateGameData(teams, chosenWord, clueData) {
    checkForWinner(teams);

    if (chosenWord.team !== chosenWord.guess) {
      console.log("chosenWord.team !== chosenWord.guess");
      setCurrTeam((prevCurrTeam) => (prevCurrTeam === "blue" ? "red" : "blue"));
    } else if (clueData.numGuesses === 0) {
      console.log("clueData.numGuesses === 0");
      setCurrTeam((prevCurrTeam) => (prevCurrTeam === "blue" ? "red" : "blue"));
    }
  }

  function checkForWinner(teams) {
    if (teams.red.score === 7) {
      console.log("red team wins!");
      setWinner({ team: "red", players: teams.red.players });
    } else if (teams.blue.score === 8) {
      console.log("blue team wins!");
      setWinner({ team: "blue", players: teams.blue.players });
    }
  }

  return (
    <div className="App">
      {/* <Header /> */}
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
          currClue={currClue}
        />
      )}
      {winner !== null && (
        <DisplayWinner winningTeam={winner.team} players={winner.players} />
      )}
    </div>
  );
}

export default App;
