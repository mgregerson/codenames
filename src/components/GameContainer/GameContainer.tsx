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

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
        <div className="md:col-span-2 p-4">
          <div className="flex h-1/2 items-center justify-center flex-col">
            {teams.red && (
              <TeamBoard
                players={teams.red.players}
                teamColor="red"
                teamScore={teams.red.score}
              />
            )}
            {currClue && (
              <DisplayClue
                clue={currClue.clue}
                numGuesses={currClue.numGuesses}
              />
            )}
          </div>
        </div>
        <div className="md:col-span-6 p-4">
          {player.role === "spymaster" && cards && currTeam === player.team && (
            <ProvideClue emitClue={emitClue} />
          )}
          {cards && (
            <CardList
              cards={cards}
              currTeam={currTeam}
              guesses={guesses}
              player={player}
            />
          )}
        </div>
        <div className="md:col-span-2 p-4">
          <div className="flex h-1/2 items-center justify-center">
            {teams.blue && (
              <TeamBoard
                players={teams.blue.players}
                teamColor="blue"
                teamScore={teams.blue.score}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameContainer;
