import React from "react";
import StartGame from "../StartGame/StartGame";
import SpymasterBoard from "../SpymasterBoard/SpyMasterBoard";
import CardList from "../CardList/CardList";
import PlayerList from "../PlayerList/PlayerList";
import { GameContainerProps } from "../../types/types";

const GameContainer: React.FC<GameContainerProps> = ({
  player,
  cards,
  guesses,
  handleGuess,
  teams,
  startGame,
}) => {
  return (
    <>
      <StartGame startGame={startGame} />
      {player.role === "spymaster" && cards && <SpymasterBoard cards={cards} />}
      {cards && (
        <CardList cards={cards} handleGuess={handleGuess} guesses={guesses} />
      )}
      {teams && teams.redTeam && teams.blueTeam && (
        <PlayerList redTeam={teams.redTeam} blueTeam={teams.blueTeam} />
      )}
    </>
  );
};

export default GameContainer;
