import React from "react";
import TeamPlayer from "./TeamList/TeamPlayer/TeamPlayer";
import TeamScore from "./TeamList/TeamScore/TeamScore";
import { TeamBoardProps } from "../../types/types";
import "./TeamBoard.css";
import redGuess from "../../styles/redGuess.png";
import blueGuess from "../../styles/blueGuess.png";
/** TeamList Component
 *
 * Renders a container for a team - red or blue
 * Displays the team's score and players
 *
 * @param {TeamBoardProps} props - teamColor, teamScore, players
 * @returns {JSX.Element} - TeamBoard component
 *
 * GameContainer -> TeamBoard -> TeamScore + TeamPlayer
 */

export default function TeamBoard({
  players,
  teamColor,
  teamScore,
}: TeamBoardProps): JSX.Element {
  const cardImage = teamColor === "red" ? redGuess : blueGuess;

  return (
    <div
      id={`TeamBoard-${teamColor}`}
      className="rounded-lg p-2 mt-10 mx-2 mb-6 grid grid-rows-[auto,1fr] shadow-xl border-1 border-black"
    >
      <div className="box-border flex items-center justify-between">
        <div className="w-3/4">
          <img src={cardImage} alt={teamColor} className="rounded-xl" />
        </div>
        <div className="w-1/4 text-white font-extrabold text-5xl">
          {teamScore && <TeamScore score={teamScore} />}
        </div>
      </div>
      <div className="flex flex-wrap mt-2">
        {players.map((player, index) => (
          <TeamPlayer key={index} name={player.name} />
        ))}
      </div>
    </div>
  );
}
