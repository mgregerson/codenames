import React, { useContext } from "react";
import StartGame from "../GameSetup/StartGame/StartGame";
import CardList from "./Gameboard/CardList";
import TeamBoard from "../TeamContainer/TeamBoard";
import DisplayClue from "../Dashboard/DisplayClue";
import { GameContainerProps } from "../../types/types";
import ProvideClue from "../SpymasterContainer/ProvideClue/ProvideClue";
import { SocketContext } from "../../context/socketContext";

const GameContainer: React.FC<GameContainerProps> = ({
  player,
  cards,
  guesses,
  teams,
  startGame,
  currTeam,
  currClue,
}) => {
  const socket = useContext(SocketContext);

  function emitClue(clueData: { clue: string; numGuesses: number }): void {
    socket.emit("emitClue", clueData);
  }

  return (
    <>
      {guesses.length === 0 && <StartGame startGame={startGame} />}

      <div className="flex flex-col h-full mx-4">
        <div className="w-full mb-4 lg:mb-0">
          <div className="flex lg:flex-row flex-col">
            <div className="w-full lg:w-1/4 md:w-1/4 sm:w-2/12">
              {teams.red && (
                <TeamBoard
                  players={teams.red.players}
                  teamColor="red"
                  teamScore={teams.red.score}
                />
              )}
              {teams.blue && (
                <TeamBoard
                  players={teams.blue.players}
                  teamColor="blue"
                  teamScore={teams.blue.score}
                />
              )}
              {currClue && (
                <DisplayClue
                  clue={currClue.clue}
                  numGuesses={currClue.numGuesses}
                />
              )}
            </div>
            <div className="w-full lg:w-3/4 md:w-3/4 sm:w-10/12">
              {cards && (
                <CardList
                  cards={cards}
                  currTeam={currTeam}
                  guesses={guesses}
                  player={player}
                />
              )}
              {player.role === "spymaster" &&
                cards &&
                currTeam === player.team && <ProvideClue emitClue={emitClue} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameContainer;
