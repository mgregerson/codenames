// import React from "react";
// import { useEffect, useState, useContext } from "react";
// import "./App.css";

// import { useCardContext } from "../src/context/cardContext";
// import { SocketContext } from "../src/context/socketContext";

// import GameContainer from "../src/components/GameContainer/GameContainer";
// import PlayerRegistration from "../src/components/GameSetup/PlayerRegistration/PlayerRegistration";

// import {
//   ClueData,
//   Guesses,
//   Guess,
//   Cards,
//   Player,
//   Teams,
//   TeamType,
//   Word,
//   TeamPlayer,
//   chosenWord,
// } from "../src/types/types";

// function App() {
//   const cards = useCardContext();
//   const socket = useContext(SocketContext);
//   const [player, setPlayer] = useState<Player | null>(null);
//   const [players, setPlayers] = useState<Array<TeamPlayer>>([]);
//   const [teams, setTeams] = useState<Teams>({ red: [], blue: [] });
//   const [guesses, setGuesses] = useState<Guesses | []>([]);
//   const [currTeam, setCurrTeam] = useState<TeamType>(null);
//   const [winner, setWinner] = useState<TeamType>(null);
//   const [currClue, setCurrClue] = useState<ClueData>({
//     clue: null,
//     numGuesses: 0,
//   });

//   console.log(guesses, "THE guesses in app");
//   console.log(player, "THE PLAYER");
//   console.log(currTeam, "currTeam");
//   console.log(teams, "THE TEAMS IN APP");
//   console.log(currClue, "currClue in app");

//   useEffect(() => {
//     // Handle player joining event
//     // socket.on("playerJoined", (newPlayerName: number) => {
//     //   setPlayers((prevPlayers) => [...prevPlayers, newPlayerName]);
//     // });

//     socket.on("teamUpdate", (teams: Teams) => {
//       setTeams(teams);
//     });

//     // Handle guess made event
//     socket.on(
//       "guessMade",
//       (
//         updatedCards: Cards,
//         teams: Teams,
//         chosenWord: Guess,
//         clueData: ClueData
//       ) => {
//         setGuesses(updatedCards);
//         setTeams(teams);
//         setCurrClue(clueData);
//         // Delay the call to updateGameData to ensure state updates take effect
//         setTimeout(() => {
//           updateGameData(teams, chosenWord, clueData);
//         }, 0);
//       }
//     );

//     socket.on("clue", (clue: string, numGuesses: number) => {
//       setCurrClue((prevCurrClue) => ({ clue, numGuesses }));
//     });

//     socket.on("gameStarted", (items: Cards) => {
//       setCurrTeam("blue");
//       setGuesses(items);
//     });

//     if (socket) {
//       handleJoinGame();
//     }

//     // Cleanup socket connection on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);

//   function handleJoinGame() {
//     // Emit join event to the server
//     socket.emit("join", socket.id);
//   }

//   // Update player, Players, and call handleTeamSelect when player registers
//   function handlePlayerRegistration(data: Player) {
//     setPlayer(data);
//     setPlayers((prevPlayers) =>
//       prevPlayers.filter((player) => player.name !== data.playerName)
//     );
//     handleTeamSelect(data.team, data.role, data.playerName);
//   }

//   // Emit joinTeam event to the server
//   const handleTeamSelect = (
//     team: TeamType,
//     role: "spymaster" | "guesser",
//     name: string
//   ) => {
//     socket.emit("joinTeam", team, role, name);
//   };

//   // Emit startGame event to the server
//   function startGame() {
//     socket.emit("startGame", cards);
//   }

//   // Update GameData based on guess made
//   // Change currTeam if guess is wrong or if numGuesses is 0
//   // Call Check for winner
//   function updateGameData(teams: Teams, chosenWord: Guess, clueData: ClueData) {
//     checkForWinner(teams);
//     if (chosenWord.team !== chosenWord.guess) {
//       setCurrTeam((prevCurrTeam) => (prevCurrTeam === "blue" ? "red" : "blue"));
//     } else if (clueData.numGuesses === 0) {
//       setCurrTeam((prevCurrTeam) => (prevCurrTeam === "blue" ? "red" : "blue"));
//     }
//   }

//   // Check for winner
//   function checkForWinner(teams: Teams) {
//     if (Array.isArray(teams.red) || Array.isArray(teams.blue)) {
//       return; // Teams are empty arrays, handle this case accordingly
//     }

//     if (teams.red.score === 7) {
//       console.log("red team wins!");
//       setWinner("red");
//     } else if (teams.blue.score === 8) {
//       console.log("blue team wins!");
//       setWinner("blue");
//     }
//   }

//   return (
//     <div className="App">
//       {player === null ? (
//         <PlayerRegistration
//           handlePlayerRegistration={handlePlayerRegistration}
//         />
//       ) : (
//         <GameContainer
//           player={player}
//           cards={cards}
//           guesses={guesses}
//           currTeam={currTeam}
//           teams={teams}
//           startGame={startGame}
//           currClue={currClue}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
