import React from "react";
import TeamPlayer from "./TeamList/TeamPlayer/TeamPlayer";
import TeamScore from "./TeamList/TeamScore/TeamScore";
import { TeamBoardProps } from "../../types/types";
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
    <div id={`TeamBoard-${teamColor}`} className={`bg-${teamColor}-dark`}>
      <div className="w-full box-border flex items-center justify-between">
        <div className="w-1/2">
          <img src={cardImage} alt={teamColor} className="h-auto max-w-full" />
        </div>
        <div className="w-1/2">
          {teamScore && <TeamScore score={teamScore} />}
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {players.map((player, index) => (
          <TeamPlayer key={index} name={player.name} />
        ))}
      </div>
    </div>
  );
}
