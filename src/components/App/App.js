import "./App.css";
import { useEffect, useState, useContext, useRef } from "react";
import React from "react";
import CardList from "../GameContainer/Gameboard/CardList/CardList";
import { useCardContext } from "../../context/cardContext";
import { SocketContext } from "../../context/socketContext";
import GameContainer from "../GameContainer/GameContainer";
import codenamesApi from "../../utils/api";
import PlayerRegistration from "../GameSetup/PlayerRegistration/PlayerRegistration";
import StartGame from "../GameSetup/StartGame/StartGame";
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
  const [winner, setWinner] = useState(null);
  const [numGuesses, setNumGuesses] = useState(null);
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

  //
  /** this function replaces checkForWinner: it will do the following:
   * call checkForWinner -> if winner, setWinner
   *
   * if not winner, then:
   * 1. if chosenWord.team !== chosenWord.guess, then changeTeamLogic
   * 2. if currClue.numGuesses === 0, then changeTeamLogic
   * 3. if chosenWord.team === chosenWord.guess, then reduce numGuesses by 1
   *
   */

  // TODO: Fix UPDATEGAME DATA

  // function updateGameData(updatedCards, teams, chosenWord) {
  //   checkForWinner(teams);
  //   console.log(currClue, "currClue in updateGameData");
  //   // if (chosenWord.team !== chosenWord.guess) {
  //   if (chosenWord.team !== chosenWord.guess) {
  //     // we want to update the currTeam to the other team
  //     setCurrTeam((prevCurrTeam) => (prevCurrTeam === "blue" ? "red" : "blue"));
  //   } else if (currClue.numGuesses === 0) {
  //     // we want to update the currTeam to the other team
  //     setCurrTeam((prevCurrTeam) => (prevCurrTeam === "blue" ? "red" : "blue"));
  //   } else if (chosenWord.team === chosenWord.guess) {
  //     // we want to reduce the number of guesses by 1
  //     setCurrClue((prevCurrClue) => {
  //       return {
  //         ...prevCurrClue,
  //         numGuesses: prevCurrClue.numGuesses - 1,
  //       };
  //     });
  //   }
  // }

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
      setWinner("red");
    } else if (teams.blue.score === 8) {
      console.log("blue team wins!");
      setWinner("blue");
    }
  }

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
          currClue={currClue}
        />
      )}
    </div>
  );
}

export default App;
