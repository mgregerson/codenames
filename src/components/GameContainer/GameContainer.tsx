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
  teams,
  startGame,
  currTeam,
}) => {
  return (
    <>
      <StartGame startGame={startGame} />
      {player.role === "spymaster" && cards && <SpymasterBoard cards={cards} />}
      {cards && (
        <CardList cards={cards} currTeam={currTeam} guesses={guesses} />
      )}
      {teams.red && teams.blue && (
        <PlayerList redTeam={teams.red.players} blueTeam={teams.blue.players} />
      )}
    </>
  );
};

export default GameContainer;
