import React from "react";
import StartGame from "../GameSetup/StartGame/StartGame";
import CardList from "./Gameboard/CardList/CardList";
import PlayerList from "../Dashboard/PlayerList/PlayerList";
import Score from "../Dashboard/Score/Score";
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
      {player.role === "spymaster" && cards && (
        <SpymasterContainer cards={cards} currTeam={currTeam} player={player} />
      )}

      {cards && (
        <CardList
          cards={cards}
          currTeam={currTeam}
          guesses={guesses}
          player={player}
        />
      )}
      {teams.red && teams.blue && (
        <>
          <PlayerList
            redTeam={teams.red.players}
            blueTeam={teams.blue.players}
          />
          <Score redScore={teams.red.score} blueScore={teams.blue.score} />
          {currClue && (
            <DisplayClue
              clue={currClue.clue}
              numGuesses={currClue.numGuesses}
            />
          )}
        </>
      )}
    </>
  );
};

export default GameContainer;
