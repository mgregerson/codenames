import React from "react";
import StartGame from "../GameSetup/StartGame/StartGame";
import CardList from "./Gameboard/CardList/CardList";
import TeamBoard from "../TeamContainer/TeamBoard";
import DisplayClue from "../Dashboard/DisplayClue/DisplayClue";
import { GameContainerProps } from "../../types/types";
import SpymasterContainer from "../SpymasterContainer/SpymasterContainer";

const GameContainer: React.FC<GameContainerProps> = ({
  player,
  cards,
  guesses,
  teams,
  startGame,
  currTeam,
  currClue,
}) => {
  return (
    <>
      {guesses.length === 0 && <StartGame startGame={startGame} />}

      <div className="flex flex-col lg:flex-row h-full">
        <div className="w-1/5 lg:w-1/5">
          {teams.red && (
            <TeamBoard
              players={teams.red.players}
              teamColor="red"
              teamScore={teams.red.score}
            />
          )}
          {player.role === "spymaster" && cards && (
            <SpymasterContainer
              cards={cards}
              currTeam={currTeam}
              player={player}
            />
          )}
        </div>

        <div className="w-3/5 lg:w-3/5">
          {cards && (
            <CardList
              cards={cards}
              currTeam={currTeam}
              guesses={guesses}
              player={player}
            />
          )}
        </div>

        <div className="w-1/5 lg:w-1/5">
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
      </div>
    </>
  );
};

export default GameContainer;
